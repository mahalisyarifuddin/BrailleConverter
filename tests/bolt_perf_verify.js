const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const html = fs.readFileSync(path.resolve(__dirname, '../BrailleConverter.html'), 'utf8');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const scriptContent = scriptMatch[1].replace(/class App \{[\s\S]*?window\.app = new App\(\);/s, '');

const sandbox = {
    document: { getElementById: () => ({}), documentElement: {}, querySelectorAll: () => [] },
    navigator: { language: 'en' },
    window: {},
    console: console,
    setTimeout: () => {}
};
sandbox.window = sandbox;

const fn = new Function('sandbox', `
    with (sandbox) {
        ${scriptContent}
        return { textToBraille, SCRIPTS, BASE, DIGITS, PUNCT, SCRIPT_CACHE, BLANK, NUM_SIGN, CAP_SIGN };
    }
`);

const { textToBraille, SCRIPTS, BASE, DIGITS, PUNCT, SCRIPT_CACHE, BLANK, NUM_SIGN, CAP_SIGN } = fn(sandbox);

// Original (unoptimized) version for comparison
function textToBrailleOriginal(text, scriptKey) {
    const script = SCRIPTS[scriptKey] || SCRIPTS.zm;
    let processed = text;
    if (script.preProcess) processed = script.preProcess(text);
    const letters = script.letters || {};
    const sortedKeys = Object.keys(letters).sort((a, b) => b.length - a.length);
    const cells = [];
    let inNum = false, i = 0;
    while (i < processed.length) {
        const ch = processed[i];
        if (ch === '\n' || ch === '\r' || ch === ' ' || ch === '\t') {
            inNum = false;
            const isLineBreak = ch === '\n' || ch === '\r';
            cells.push({braille: isLineBreak ? ch : BLANK, source: isLineBreak ? '↵' : ch, isSpace: true});
            i++; continue;
        }
        if (DIGITS[ch]) {
            if (!inNum) { cells.push({braille: NUM_SIGN, source: '⠼', isPrefix: true}); inNum = true; }
            cells.push({braille: DIGITS[ch], source: ch}); i++; continue;
        }
        inNum = false;
        let found = false;
        for (const key of sortedKeys) {
            if (processed.toLowerCase().startsWith(key.toLowerCase(), i)) {
                const source = processed.substring(i, i + key.length);
                if (source !== key.toLowerCase() && source === source.toUpperCase()) cells.push({braille: CAP_SIGN, source: '⠠', isPrefix: true});
                const brailleStr = letters[key];
                for (const b of brailleStr) cells.push({braille: b, source: key.length === 1 ? key : source});
                i += key.length; found = true; break;
            }
        }
        if (!found) {
            if (BASE[ch.toLowerCase()]) {
                if (ch !== ch.toLowerCase()) cells.push({braille: CAP_SIGN, source: '⠠', isPrefix: true});
                cells.push({braille: BASE[ch.toLowerCase()], source: ch});
            } else if (PUNCT[ch]) {
                cells.push({braille: PUNCT[ch], source: ch});
            } else {
                cells.push({braille: BLANK, source: ch});
            }
            i++;
        }
    }
    return cells;
}

const testText = "The quick brown fox jumps over the lazy dog. ".repeat(1000); // ~45KB
console.log(`Input size: ${testText.length} characters`);

// Clear cache to ensure fair comparison
for (const key in SCRIPT_CACHE) delete SCRIPT_CACHE[key];

// Warm up
textToBraille(testText, 'en');
textToBrailleOriginal(testText, 'en');

const startOpt = performance.now();
const resultOpt = textToBraille(testText, 'en');
const endOpt = performance.now();
console.log(`Optimized version: ${(endOpt - startOpt).toFixed(2)}ms`);

const startOrig = performance.now();
const resultOrig = textToBrailleOriginal(testText, 'en');
const endOrig = performance.now();
console.log(`Original version: ${(endOrig - startOrig).toFixed(2)}ms`);

const speedup = (endOrig - startOrig) / (endOpt - startOpt);
console.log(`Speedup factor: ${speedup.toFixed(2)}x`);

// Parity check
const optStr = JSON.stringify(resultOpt.map(c => c.braille));
const origStr = JSON.stringify(resultOrig.map(c => c.braille));

if (optStr === origStr) {
    console.log('✅ Output parity verified');
} else {
    console.error('❌ Output mismatch!');
    process.exit(1);
}

if (speedup > 1.2) {
    console.log('✅ Performance improvement confirmed (> 20%)');
} else {
    console.log('⚠️ Performance improvement less than expected');
}
