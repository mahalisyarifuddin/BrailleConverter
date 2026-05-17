const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../BrailleConverter.html'), 'utf8');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
    console.error('Could not find script block');
    process.exit(1);
}

let scriptContent = scriptMatch[1];

// Remove the App class and window.app initialization to avoid DOM issues
scriptContent = scriptContent.replace(/class App \{[\s\S]*?window\.app = new App\(\);/s, '');

// Mocking needed objects to run the script content
const sandbox = {
    document: {
        getElementById: () => ({ onchange: null, onclick: null, value: '' }),
        documentElement: { lang: '' },
        querySelectorAll: () => []
    },
    navigator: {
        language: 'en'
    },
    window: {},
    console: console,
    setTimeout: () => {}
};
sandbox.window = sandbox;

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
