const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../BrailleConverter.html'), 'utf8');

const scripts = html.match(/<script[\s\S]*?<\/script>/g) || [];
const appScript = scripts.find(s => s.includes('brailleToText'));
if (!appScript) {
    console.error('Could not find script block containing brailleToText');
    process.exit(1);
}

let scriptContent = appScript.replace(/<\/?script>/g, '');

// Remove the App class and window.app initialization to avoid DOM issues
scriptContent = scriptContent.replace(/class App \{[\s\S]*?window\.app = new App\(\);/s, '');

// Mocking needed objects to run the script content
const AppSettings = { detectLang: () => 'en', applyLang: l => l, applyTheme: () => {} };
const sandbox = {
    document: {
        getElementById: () => ({ onchange: null, onclick: null, value: '' }),
        documentElement: { lang: '', classList: { toggle: () => {}, add: () => {}, remove: () => {} } },
        querySelectorAll: () => []
    },
    navigator: {
        language: 'en'
    },
    window: { AppSettings, matchMedia: () => ({ matches: false, addEventListener: () => {} }), addEventListener: () => {} },
    console: console,
    setTimeout: () => {},
    AppSettings
};
sandbox.window.window = sandbox.window;
sandbox.window.document = sandbox.document;

try {
    // Run the script to populate the sandbox with the constants and functions
    const fn = new Function('sandbox', `
        with (sandbox) {
            ${scriptContent}
            return { brailleToText };
        }
    `);
    const { brailleToText } = fn(sandbox);

    const numSign = "\u283c";
    const brailleOne = "\u2801";
    const brailleZero = "\u281a";

    const testInput = numSign + brailleOne + brailleZero;
    const result = brailleToText(testInput, 'en');

    console.log('Input Braille: ⠼⠁⠚');
    console.log('Expected Output: 10');
    console.log('Actual Output:', result);

    if (result === '10') {
        console.log('✅ Test Passed');
        process.exit(0);
    } else {
        console.log('❌ Test Failed');
        process.exit(1);
    }
} catch (e) {
    console.error('Error executing script:', e);
    process.exit(1);
}
