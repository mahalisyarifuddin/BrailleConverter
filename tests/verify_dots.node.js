const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../BrailleConverter.html'), 'utf8');

const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
let scriptContent = scriptMatches.map(m => m[1]).join('\n');

const mockElements = {};
function getMockElement(id) {
    if (!mockElements[id]) {
        mockElements[id] = {
            value: '',
            textContent: '',
            innerText: '',
            classList: { add: () => {}, remove: () => {}, toggle: () => {} },
            setAttribute: () => {},
            options: []
        };
    }
    return mockElements[id];
}

const sandbox = {
    document: {
        getElementById: getMockElement,
        documentElement: { lang: 'en', classList: { add: () => {}, remove: () => {} }, dispatchEvent: () => {} },
        querySelectorAll: () => [],
        querySelector: () => ({ classList: { add: () => {}, remove: () => {} } }),
        addEventListener: () => {}
    },
    navigator: { language: 'en' },
    console: console,
    setTimeout: () => {},
    CustomEvent: function() {}
};
sandbox.window = sandbox;
sandbox.window.addEventListener = () => {};
sandbox.matchMedia = () => ({ addEventListener: () => {}, matches: false });

const fn = new Function('sandbox', `
    with (sandbox) {
        ${scriptContent}
        return { App, brailleToText, textToBraille };
    }
`);

const { App, brailleToText } = fn(sandbox);

// Test 1: Dot mode decoding "1 0 12" -> Should translate to "a b" and identify space cell
mockElements['inputArea'] = { value: '1 0 12' };
mockElements['script'] = { value: 'en' };
mockElements['autoScroll'] = { checked: false };

const appInstance = new App();
appInstance.mode = 'dots';
appInstance.update();

const textOut = mockElements['textOutput'].textContent;
const uniOut = mockElements['unicodeOutput'].textContent;

console.log('Dot Input: "1 0 12"');
console.log('Unicode Output:', JSON.stringify(uniOut));
console.log('Decoded Text Output:', JSON.stringify(textOut));

if (textOut === 'a b' && uniOut === '⠁⠀⠃') {
    console.log('✅ Dot numbers space decoding test passed');
} else {
    console.error('❌ Test failed! Expected text "a b" and unicode "⠁⠀⠃"');
    process.exit(1);
}
