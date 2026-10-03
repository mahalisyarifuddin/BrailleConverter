## 2025-05-15 - Hebrew and Script Mapping Data Integrity
**Mode:** Medic
**Learning:** Some scripts (like Hebrew) had incorrect characters (Arabic) as mapping keys, likely due to copy-paste errors from other RTL script definitions. Additionally, single-line large JSON/object literals in HTML files require targeted extraction/modification scripts rather than simple regex when they contain JS functions.
**Action:** Always verify the actual Unicode characters used as keys in mapping tables, especially for scripts that share directionality or regional proximity. Use robust AST-aware or execution-based verification for complex data structures.

## 2025-05-16 - Ambiguous Reverse Mappings
**Mode:** Medic
**Learning:** Reversing an object map using `Object.fromEntries` on `Object.entries` is dangerous if multiple keys map to the same value (e.g., standard '0' and Persian '۰' both mapping to Braille '⠚'). The last entry in the object literal will "win" the reverse mapping, leading to unexpected output characters.
**Action:** Use explicit static objects for reverse mappings when the source mapping contains many-to-one relationships, ensuring the desired "canonical" character is the value.

## 2026-05-23 - Preserving Child Elements during Translation
**Mode:** Medic
**Learning:** In the centralized internationalization system where IDs in the 'text' object map directly to HTML elements, assigning to 'innerText' wipes out any child HTML (e.g., <span class="tag">). This caused the "New" tag to disappear whenever the language was toggled.
**Action:** Wrap only the translatable text portions of a label in their own <span> elements with unique IDs, allowing the parent or sibling HTML tags to remain untouched during the translation update.

## 2025-05-24 - Newline Preservation and innerText
**Mode:** Medic
**Learning:** Using `innerText` for Braille outputs (Unicode, Dot Notation) can cause newlines to be stripped or ignored in certain contexts, especially when combined with `.trim()`. Additionally, numeric mode in Braille should be reset upon encountering a line break.
**Action:** Use `textContent` instead of `innerText` for updating conversion outputs to ensure newline preservation. Explicitly handle `\n` and `\r` in `textToBraille` and `brailleToText` to maintain document structure and reset state machines (like `inNum`).

## 2025-05-25 - DOM Reflow Bottleneck in Real-time Rendering
**Mode:** Bolt
**Learning:** In applications with real-time conversion (on 'input' events), updating a large visual grid using `element.innerHTML += htmlChunk` creates an O(n²) performance bottleneck due to repeated DOM parsing and layout reflows. This becomes especially visible when the output grows beyond a few lines.
**Action:** Always batch DOM updates by building an array of HTML strings and performing a single `innerHTML` assignment. Additionally, defer expensive rendering (like the visual grid) unless the corresponding tab is active.

## 2026-06-27 - Redundant String Allocations in Real-time Conversion
**Mode:** Bolt
**Learning:** Performing `processed.toLowerCase()` inside a nested loop for every character in the input string leads to (N^2 \times M)$ string allocations. In real-time converters, this causes noticeable lag on large inputs (40KB+).
**Action:** Pre-calculate the lowercase input once and cache lowercase script keys in `SCRIPT_CACHE` to eliminate redundant allocations in the hot matching loop.

## 2026-07-01 - Key Grouping and Fast Path for Key-less Scripts in Match Loops
**Mode:** Bolt
**Learning:** Even with pre-calculated lowercase input, executing `processedLower.startsWith(keyLower, i)` inside a nested loop over all sorted language keys results in an $O(L)$ linear scan per character, which becomes a severe bottleneck for scripts with hundreds of custom letters (like Amharic, Dzongkha, or Hindi). Furthermore, scripts with no custom characters still paid the cost of an empty loop.
**Action:** Group custom script keys by their first character (lowercased) in the cache, and retrieve only those candidate keys matching the current character to reduce matching search space. Check a cached `hasKeys` flag and employ a direct, fast path for scripts with no custom letters.

## 2026-07-02 - Layout Reflow Bottleneck in Real-Time Stat Calculation
**Mode:** Bolt
**Learning:** Calling `innerText` on output elements (like `#textOutput`) in `oninput` handlers forces the browser to flush pending DOM updates and recalculate layout synchronously on every keystroke.
**Action:** Pass calculated values directly from JavaScript memory into UI stat methods and use `textContent` instead of `innerText` to prevent synchronous DOM layout recalculations.

## 2026-07-03 - Unescaped User Input Tokens in Visual Cell Labels
**Mode:** Medic
**Learning:** In Dot Numbers mode, `c.source` contains multi-character input tokens (e.g. `<b/style=color:red>hello</b>`). Interpolating `${c.source}` directly into `.cell-label` HTML without escaping HTML entities allowed active DOM elements to be injected into `wrap.innerHTML`.
**Action:** Always wrap source strings with an HTML entity escaper (`esc()`) prior to interpolating them into HTML strings for `innerHTML` assignments.

## 2026-07-04 - State Reset when Parsing Prefix Indicators in Braille Decoding
**Mode:** Medic
**Learning:** Prefix indicators such as `CAP_SIGN` (`⠠`) appear prior to main checks in `brailleToText`. When prefix indicators transition the parser state (e.g. arming `capNext`), state machine flags like `inNum` must be explicitly reset to false, otherwise the parser remains in numeric mode and incorrectly decodes following letter cells as digits.
**Action:** Always ensure state-modifying prefix handlers explicitly update or reset all associated parser state flags before continuing the loop.

## 2026-07-05 - CRLF Line Break Preservation in Dot Notation and Visual Cells
**Mode:** Medic
**Learning:** In JavaScript regexes, `\s` includes carriage return `\r`. Post-processing patterns like `.replace(/\s?\n\s?/g, '\n')` accidentally strip `\r` from Windows CRLF (`\r\n`) line endings. Furthermore, multi-character cell strings like `c.braille = '\r\n'` fail strict single-character equality checks `c.braille === '\n' || c.braille === '\r'`, causing CRLF line breaks to be treated as space cells ('0') in Dot Numbers mode and Visual Cell grid renderer.
**Action:** Use `/[\r\n]/.test(...)` to detect line breaks in multi-character cell objects, and use `[ \t]` explicitly instead of `\s` when trimming horizontal whitespace surrounding line breaks (`.replace(/[ \t]?(\r?\n|\r)[ \t]?/g, '$1')`).
