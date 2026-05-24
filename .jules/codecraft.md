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
