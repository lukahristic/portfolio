/*
 * Screenshots /og to public/og-image.png at exactly 1200x630.
 *
 *   npm run og
 *
 * src/pages/og.astro is the single source of truth. The previous image was a
 * hand-made export that went stale the moment the positioning changed and
 * nobody noticed, because nothing pointed back at it.
 *
 * Starts its own dev server unless one is already listening on PORT.
 */
import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.PORT ?? 4321);
const URL_ = `http://localhost:${PORT}/og`;
const OUT = resolve('public/og-image.png');
const WIDTH = 1200;
const HEIGHT = 630;

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
    return (await fetch(URL_, { signal: AbortSignal.timeout(1500) })).ok;
  } catch {
    return false;
  }
};

let server = null;
if (!(await isUp())) {
  console.log(`No server on :${PORT} — starting dev...`);
  server = spawn('npm', ['run', 'dev', '--', '--port', String(PORT)], {
    stdio: 'ignore',
    shell: true,
  });
  let ok = false;
  for (let i = 0; i < 40 && !ok; i++) {
    await new Promise((r) => setTimeout(r, 500));
    ok = await isUp();
  }
  if (!ok) {
    server.kill();
    console.error(`Server never came up on :${PORT}.`);
    process.exit(1);
  }
}

console.log(`Shooting ${URL_} at ${WIDTH}x${HEIGHT} -> ${OUT}`);
const exit = await new Promise((res) => {
  const p = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--default-background-color=00000000',
      `--window-size=${WIDTH},${HEIGHT}`,
      // Webfonts must finish loading or the card falls back to system faces.
      '--virtual-time-budget=10000',
      `--screenshot=${OUT}`,
      URL_,
    ],
    { stdio: 'inherit' }
  );
  p.on('exit', res);
});

server?.kill();

if (exit !== 0 || !existsSync(OUT)) {
  console.error('Screenshot failed.');
  process.exit(1);
}

const kb = statSync(OUT).size / 1024;
console.log(`Wrote ${kb.toFixed(0)} kB to public/og-image.png`);
if (kb > 300) {
  console.warn('Warning: over 300 kB. Crawlers are slow to fetch large previews.');
}
