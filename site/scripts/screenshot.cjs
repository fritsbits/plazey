const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');

(async () => {
  const url = 'http://localhost:4321/nl';
  const out = '/tmp/plazey-screenshot.png';

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ path: out, fullPage: true });
    console.log(out);
  } catch (e) {
    console.error('Screenshot failed (dev server running?):', e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
