const { chromium } = require("playwright");

const seeds = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let total = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url, { waitUntil: "networkidle" });

    const values = await page.locator("table td").allTextContents();

    const sum = values.reduce((acc, text) => {
      const n = Number(text.trim());
      return Number.isFinite(n) ? acc + n : acc;
    }, 0);

    console.log(`Seed ${seed}: ${sum}`);
    total += sum;
  }

  console.log(`TOTAL SUM: ${total}`);

  await browser.close();
})();
