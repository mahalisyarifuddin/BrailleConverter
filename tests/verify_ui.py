import os
import asyncio
from playwright.async_api import async_playwright

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        file_path = "file://" + os.path.abspath("BrailleConverter.html")
        await page.goto(file_path)

        test_cases = [
            {"script": "he", "input": "\u05dc", "expected": "\u2807", "name": "Hebrew Lamed"},
            {"script": "he", "input": "\u05e8", "expected": "\u2817", "name": "Hebrew Resh"},
            {"script": "az", "input": "\u0259", "expected": "\u2823", "name": "Azerbaijani schwa"},
            {"script": "az", "input": "\u011f", "expected": "\u283b", "name": "Azerbaijani g-breve"},
            {"script": "ro", "input": "\u021b", "expected": "\u2833", "name": "Romanian t-comma"}
        ]

        all_passed = True
        for tc in test_cases:
            await page.select_option("#script", tc["script"])
            await page.fill("#inputArea", tc["input"])

            # Wait for conversion
            await asyncio.sleep(0.1)

            output = await page.text_content("#unicodeOutput")
            if output == tc["expected"]:
                print(f"✅ {tc['name']} passed")
            else:
                print(f"❌ {tc['name']} failed: expected {tc['expected']}, got {output}")
                all_passed = False

        await browser.close()
        if not all_passed:
            exit(1)

if __name__ == "__main__":
    asyncio.run(run_tests())
