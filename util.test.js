const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("Should output name and age", () => {
  const text = generateText("Max", 20);
  expect(text).toBe("Max (20 years old)");
});

test("Should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 22);
  expect(text).toBe("Max (22 years old)");
});

test("Should create an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    // args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/");
  await page.click("input#name");
  await page.type("input#name", "Bruno");
  await page.click("input#age");
  await page.type("input#age", "27");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", el => el.textContent);
  expect(finalText).toBe("Bruno (27 years old)");
}, 10000);
