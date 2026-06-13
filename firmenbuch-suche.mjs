/**
 * firmenbuch-suche.mjs
 * ---------------------------------------------------------------------------
 * Sucht eine Firma auf openfirmenbuch.at, oeffnet (sichtbar) den Browser,
 * macht Screenshots und laedt ALLE veroeffentlichten Jahresabschluss-PDFs herunter
 * und benennt sie lesbar um (Geschaeftsjahr + Einreichdatum).
 *
 * AUFRUF (PowerShell / Bash), Node muss installiert sein:
 *   node "firmenbuch-suche.mjs" "Velartis GmbH"
 *
 * Optionen ueber Umgebungsvariablen:
 *   HEADLESS=1      -> Browser unsichtbar (kein Fenster), z.B. fuer schnelle Laeufe
 *   NO_DOWNLOAD=1   -> nur Suche + Screenshots, keine PDF-Downloads
 *   SLOWMO=200      -> kuenstliche Verzoegerung pro Aktion in ms (Default 150)
 *
 * Ergebnisse landen in:  <Ordner dieses Skripts>\output\<Firmenname>\
 * ---------------------------------------------------------------------------
 * WICHTIG: Playwright + Chromium kommen aus einem bereits installierten Projekt.
 * Der Pfad unten (PLAYWRIGHT_ANCHOR) zeigt auf dessen package.json. Wenn dieses
 * Projekt verschoben/geloescht wird, hier anpassen ODER in "alexs projekt"
 * einmalig:   npm init -y && npm i @playwright/test && npx playwright install chromium
 * und dann den Import unten auf  import { chromium } from '@playwright/test'  aendern.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

// --- Playwright laden: zuerst aus diesem Repo (nach `npm install`), sonst aus core-app ---
function loadChromium() {
  const anchors = [
    import.meta.url, // dieses Repo: ./node_modules nach `npm install && npx playwright install chromium`
    'C:/Users/Leonie/OneDrive - Fachschule für Sozialberufe/Desktop/core-app/package.json', // Fallback auf diesem PC
  ];
  for (const a of anchors) {
    try { return createRequire(a)('@playwright/test').chromium; } catch { /* naechsten Anker versuchen */ }
  }
  throw new Error('Playwright nicht gefunden. Im Repo ausfuehren:  npm install  &&  npx playwright install chromium');
}
const chromium = loadChromium();

// --- Konfiguration ---
const FIRMA = (process.argv[2] || process.env.FIRMA || '').trim();
if (!FIRMA) {
  console.error('FEHLER: Bitte Firmennamen angeben, z.B.:  node firmenbuch-suche.mjs "Velartis GmbH"');
  process.exit(1);
}
const HEADLESS    = process.env.HEADLESS === '1';
const NO_DOWNLOAD = process.env.NO_DOWNLOAD === '1';
const SLOWMO      = Number(process.env.SLOWMO || 150);

const __dir = path.dirname(fileURLToPath(import.meta.url));
// entfernt unter Windows verbotene Dateinamen-Zeichen, Leerzeichen werden zu "_"
const sane  = s => s.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
const OUT   = path.join(__dir, 'output', sane(FIRMA) || 'firma');
fs.mkdirSync(OUT, { recursive: true });

const log = (...a) => console.log('[fb]', ...a);

// Deutsche Monatsnamen -> Zahl (fuer Dateinamen aus "31. Dezember 2024")
const MONTHS = { januar:'01', februar:'02', maerz:'03', 'märz':'03', april:'04', mai:'05', juni:'06',
  juli:'07', august:'08', september:'09', oktober:'10', november:'11', dezember:'12' };
function germanDateToISO(d, mon, y) {
  const m = MONTHS[(mon || '').toLowerCase()] || '00';
  return `${y}-${m}-${String(d).padStart(2, '0')}`;
}
// Aus einer Tabellenzeile Stichtag-Jahr + Einreichdatum ziehen
function parseDocLabel(label) {
  const txt = label.replace(/\s+/g, ' ').trim();
  const stich = txt.match(/(\d{1,2})\.\s*([A-Za-zÄÖÜäöü]+)\s*(\d{4})/);
  const eing  = txt.match(/Eingereicht:\s*(\d{1,2})\.\s*([A-Za-zÄÖÜäöü]+)\s*(\d{4})/i);
  const typM  = txt.match(/(Jahresabschluss|Bilanz|Konzernabschluss)/i);
  return {
    gjYear: stich ? stich[3] : null,
    eingISO: eing ? germanDateToISO(eing[1], eing[2], eing[3]) : null,
    typ: typM ? typM[1] : 'Dokument',
  };
}

const browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOWMO });
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'de-AT', acceptDownloads: true });
const page = await ctx.newPage();

// Netzwerk-Fallback: letzte gesehene PDF-URL merken
let lastPdfUrl = null;
page.on('response', r => {
  const ct = (r.headers()['content-type'] || '').toLowerCase();
  if (ct.includes('pdf') || r.url().toLowerCase().endsWith('.pdf')) lastPdfUrl = r.url();
});

const saved = [];
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function openFirstResult() {
  for (const loc of [
    page.getByRole('heading', { name: new RegExp(reEsc(FIRMA), 'i') }),
    page.getByText(FIRMA, { exact: true }),
    page.getByText(new RegExp(reEsc(FIRMA), 'i')),
  ]) {
    if (await loc.count()) {
      await loc.first().click().catch(() => {});
      await page.waitForTimeout(2500);
      if (page.url().includes('/company/')) return true;
    }
  }
  return page.url().includes('/company/');
}

async function downloadRow(btn, idx) {
  let label = await btn.locator('xpath=ancestor::tr[1]').innerText().catch(() => '');
  if (!label) label = await btn.locator('xpath=ancestor::*[3]').innerText().catch(() => '');
  const { gjYear, eingISO, typ } = parseDocLabel(label);
  let base = `${sane(FIRMA)}_${typ}`;
  if (gjYear) base += `_${gjYear}`;
  if (eingISO) base += `_eingereicht_${eingISO}`;
  if (!gjYear && !eingISO) base += `_${idx}`;

  lastPdfUrl = null;
  const dlP  = page.waitForEvent('download', { timeout: 18000 }).catch(() => null);
  const popP = ctx.waitForEvent('page', { timeout: 18000 }).catch(() => null);
  await btn.click();

  let outName = `${base}.pdf`;
  let k = 2;
  while (fs.existsSync(path.join(OUT, outName))) { outName = `${base}_(${k}).pdf`; k++; }

  const dl = await dlP;
  if (dl) { await dl.saveAs(path.join(OUT, outName)); saved.push(outName); log('  OK', outName); return true; }

  const pop = await popP;
  const url = (pop && pop.url()) || lastPdfUrl;
  if (url && /^https?:/.test(url)) {
    const resp = await ctx.request.get(url).catch(() => null);
    if (resp && resp.ok()) { fs.writeFileSync(path.join(OUT, outName), Buffer.from(await resp.body())); saved.push(outName); log('  OK (url)', outName); if (pop) await pop.close().catch(()=>{}); return true; }
    if (pop) await pop.close().catch(() => {});
  }
  log('  FEHLT kein Download erfasst:', base);
  return false;
}

async function processDocPage(pageNo) {
  const btns = page.getByRole('button', { name: /Herunterladen/i });
  const n = await btns.count();
  log(`Dokument-Seite ${pageNo}: ${n} Download-Button(s)`);
  for (let i = 0; i < n; i++) { log(`  Dokument ${i + 1}/${n}`); await downloadRow(btns.nth(i), `${pageNo}_${i + 1}`); await page.waitForTimeout(400); }
  return n;
}

try {
  log('Firma:', FIRMA, '| headless:', HEADLESS, '| Downloads:', !NO_DOWNLOAD);
  log('Ausgabeordner:', OUT);

  // 1) Startseite + Suche
  await page.goto('https://openfirmenbuch.at', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, '01-startseite.png') });
  const search = page.locator('input[placeholder*="Firmennamen" i], input[type="text"]:visible').first();
  await search.click();
  await search.fill(FIRMA);
  await page.screenshot({ path: path.join(OUT, '02-eingabe.png') });
  await search.press('Enter');
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT, '03-suchergebnis.png'), fullPage: true });

  const bodyTxt = (await page.locator('body').innerText().catch(() => '')) || '';
  if (/keine Ergebnisse/i.test(bodyTxt)) {
    log('KEINE Ergebnisse fuer', FIRMA, '- Schreibweise pruefen (z.B. Velartis statt Verlartis).');
    await browser.close(); process.exit(0);
  }

  // 2) Ersten Treffer oeffnen
  if (!(await openFirstResult())) { log('Konnte Detailseite nicht oeffnen.'); await browser.close(); process.exit(1); }
  log('Detailseite:', page.url());
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, '04-detail.png'), fullPage: true });

  // Stammdaten-Text sichern
  const detailTxt = (await page.locator('body').innerText().catch(() => '')).slice(0, 8000);
  fs.writeFileSync(path.join(OUT, '_stammdaten.txt'), detailTxt, 'utf8');

  // 3) Alle Dokumente herunterladen (ueber Pagination)
  if (!NO_DOWNLOAD) {
    await page.getByText('Firmendokumente').scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(600);
    await processDocPage(1);
    // Folgeseiten der Dokumententabelle: Buttons "2", "3", ...
    for (let p = 2; p <= 20; p++) {
      const nav = page.getByRole('button', { name: String(p), exact: true });
      if (!(await nav.count())) break;
      log('wechsle zu Dokument-Seite', p);
      await nav.first().click().catch(() => {});
      await page.waitForTimeout(1800);
      const got = await processDocPage(p);
      if (got === 0) break;
    }
  }

  fs.writeFileSync(path.join(OUT, '_ergebnis.txt'),
    `Firma: ${FIRMA}\nDetail-URL: ${page.url()}\nHeruntergeladene Dateien (${saved.length}):\n` +
    saved.map(s => '  - ' + s).join('\n') + '\n', 'utf8');

  log('=== FERTIG ===');
  log('Dateien gesamt:', saved.length, '| Ordner:', OUT);
  if (!HEADLESS) { log('Browser bleibt 15s offen ...'); await page.waitForTimeout(15000); }
} catch (e) {
  log('FEHLER:', e.message);
  try { await page.screenshot({ path: path.join(OUT, '_fehler.png'), fullPage: true }); } catch {}
} finally {
  await browser.close();
}