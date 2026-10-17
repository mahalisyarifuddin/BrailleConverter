import os
import sys
from playwright.sync_api import sync_playwright

def run():
    html_path = 'file://' + os.path.abspath('BrailleConverter.html')
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(html_path)

        # Check initial placeholder in TB mode (English)
        ph_tb = page.get_attribute('#inputArea', 'placeholder')
        assert ph_tb == 'e.g. Hello world or 123', f"Expected English TB placeholder, got: {ph_tb}"

        # Switch to BT mode and verify placeholder
        page.click('#btnBT')
        ph_bt = page.get_attribute('#inputArea', 'placeholder')
        assert ph_bt == 'e.g. ⠠a⠇⠇⠕', f"Expected English BT placeholder, got: {ph_bt}"

        # Switch to Dots mode and verify placeholder
        page.click('#btnDots')
        ph_dots = page.get_attribute('#inputArea', 'placeholder')
        assert ph_dots == 'e.g. 1 12 123', f"Expected English Dots placeholder, got: {ph_dots}"

        # Switch language to Indonesian and verify localized placeholder
        page.evaluate("app.setLang('id')")
        ph_id_dots = page.get_attribute('#inputArea', 'placeholder')
        assert ph_id_dots == 'mis. 1 12 123', f"Expected Indonesian Dots placeholder, got: {ph_id_dots}"

        page.click('#btnTB')
        ph_id_tb = page.get_attribute('#inputArea', 'placeholder')
        assert ph_id_tb == 'mis. Halo dunia atau 123', f"Expected Indonesian TB placeholder, got: {ph_id_tb}"

        # Check accessibility attributes
        area_labelledby = page.get_attribute('#inputArea', 'aria-labelledby')
        assert area_labelledby == 'inputPanelTitle', f"Expected aria-labelledby='inputPanelTitle', got {area_labelledby}"

        live = page.get_attribute('#unicodeOutput', 'aria-live')
        assert live == 'polite', f"Expected aria-live='polite', got {live}"

        browser.close()

    print("✅ UX verification script passed successfully!")

if __name__ == '__main__':
    run()
