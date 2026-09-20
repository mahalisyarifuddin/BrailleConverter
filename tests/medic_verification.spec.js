const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Braille Mapping Fixes', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = 'file://' + path.resolve(__dirname, '../BrailleConverter.html');
    await page.goto(filePath);
  });

  test('Hebrew Lamed (\u05dc) converts correctly', async ({ page }) => {
    await page.selectOption('#script', 'he');
    await page.fill('#inputArea', '\u05dc');
    const output = await page.textContent('#unicodeOutput');
    expect(output).toBe('\u2807');
  });

  test('Hebrew Resh (\u05e8) converts correctly', async ({ page }) => {
    await page.selectOption('#script', 'he');
    await page.fill('#inputArea', '\u05e8');
    const output = await page.textContent('#unicodeOutput');
    expect(output).toBe('\u2817');
  });

  test('Azerbaijani schwa (\u0259) converts correctly', async ({ page }) => {
    await page.selectOption('#script', 'az');
    await page.fill('#inputArea', '\u0259');
    const output = await page.textContent('#unicodeOutput');
    expect(output).toBe('\u2823');
  });

  test('Azerbaijani g-breve (\u011f) converts correctly', async ({ page }) => {
    await page.selectOption('#script', 'az');
    await page.fill('#inputArea', '\u011f');
    const output = await page.textContent('#unicodeOutput');
    expect(output).toBe('\u283b');
  });

  test('Romanian t-comma (\u021b) converts correctly', async ({ page }) => {
    await page.selectOption('#script', 'ro');
    await page.fill('#inputArea', '\u021b');
    const output = await page.textContent('#unicodeOutput');
    expect(output).toBe('\u2833');
  });

  test('Visual Cell label HTML tags are sanitized', async ({ page }) => {
    await page.click('#btnDots');
    await page.click('#visualLabel');
    await page.fill('#inputArea', '<b/style=color:red>test</b>');
    const bCount = await page.locator('#visualOutput b').count();
    expect(bCount).toBe(0);
    const labelText = await page.textContent('#visualOutput .cell-label');
    expect(labelText).toBe('<b/style=color:red>test</b>');
  });
});
