/*
 * Prints /resume to public/resume.pdf with headless Chrome.
 *
 *   npm run resume
 *
 * src/pages/resume.astro is the single source of truth. Never hand-edit the
 * PDF — it drifts from the page and then the site and the résumé disagree,
 * which is the exact problem this script exists to prevent.
 *
 * Starts its own preview server unless one is already listening on PORT.
 */
import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.PORT ?? 4321);
const URL_ = `http://localhost:${PORT}/resume`;
const OUT = resolve('public/resume.pdf');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to the browser binary.');
  process.exit(1);
}

const isUp = async () => {
  try {
    const res = await fetch(URL_, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
};

const waitFor = async (tries = 40) => {
  for (let i = 0; i < tries; i++) {
    if (await isUp()) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
};

let server = null;
if (!(await isUp())) {
  console.log(`No server on :${PORT} — starting preview...`);
  server = spawn('npm', ['run', 'dev', '--', '--port', String(PORT)], {
    stdio: 'ignore',
    shell: true,
  });
  if (!(await waitFor())) {
    server.kill();
    console.error(`Server never came up on :${PORT}.`);
    process.exit(1);
  }
}

console.log(`Printing ${URL_} -> ${OUT}`);
const exit = await new Promise((res) => {
  const p = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      // Google Fonts must finish loading or the PDF falls back to system faces.
      '--virtual-time-budget=10000',
      `--print-to-pdf=${OUT}`,
      URL_,
    ],
    { stdio: 'inherit' }
  );
  p.on('exit', res);
});

server?.kill();

if (exit !== 0 || !existsSync(OUT)) {
  console.error('Print failed.');
  process.exit(1);
}
console.log(`Wrote ${(statSync(OUT).size / 1024).toFixed(0)} kB to public/resume.pdf`);
