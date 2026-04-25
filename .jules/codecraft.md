## 2025-05-15 - Hebrew and Script Mapping Data Integrity
**Mode:** Medic
**Learning:** Some scripts (like Hebrew) had incorrect characters (Arabic) as mapping keys, likely due to copy-paste errors from other RTL script definitions. Additionally, single-line large JSON/object literals in HTML files require targeted extraction/modification scripts rather than simple regex when they contain JS functions.
**Action:** Always verify the actual Unicode characters used as keys in mapping tables, especially for scripts that share directionality or regional proximity. Use robust AST-aware or execution-based verification for complex data structures.
