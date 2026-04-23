English | [Bahasa Indonesia](README-id.md)

# Braille Converter

Convert text to Braille and vice versa.

## Introduction

Braille Converter is a single-file, browser-based tool for converting plain text into Braille Unicode characters or dot notation, and vice versa. It supports multiple languages and scripts, providing a simple yet powerful interface for accessible communication and learning.

The interface supports both English and Bahasa Indonesia.

## How It Works

The converter works by mapping characters from various scripts to their corresponding Braille patterns based on international standards for Grade 1 (uncontracted) Braille.

1.  **Text to Braille**: Converts plain text into Braille Unicode (e.g., ⠓⠑⠇⠇⠕) and dot notation (e.g., 125 15 123 123 135). It automatically handles capital letters using the capital sign ⠠ (dot 6) and numbers using the number sign ⠼ (dots 3-4-5-6).
2.  **Braille to Text**: Decodes Braille Unicode characters back into readable text, recognizing capital and number indicators.
3.  **Dot Numbers to Braille/Text**: Allows users to input specific dot combinations (e.g., "12" for ⠃) to generate Braille characters and their corresponding text.

## Quick Start

1.  Download the `BrailleConverter.html` file from the repository.
2.  Open the file in any modern web browser.
3.  Choose your preferred conversion mode and script.
4.  Enter your text or Braille characters and click "Convert".

## Key Features

*   **Multi-language Support**: Supports English, French, German, Spanish, Portuguese, Italian, Indonesian, and Russian.
*   **Multiple Modes**: Text → Braille, Braille → Text, and Dot Numbers → Braille/Text.
*   **Grade 1 Braille**: Focuses on uncontracted Braille for clarity and standard compliance.
*   **Visual Cell Preview**: Optional visual representation of Braille cells with dot numbering.
*   **Copy to Clipboard**: One-click buttons to copy results (Unicode, Dots, or Text).
*   **Responsive Design**: Works seamlessly on desktop and mobile devices.
*   **Theme Options**: Support for Light, Dark, and Auto (system) themes.
*   **Offline Capable**: A single HTML file with no external dependencies; works completely offline.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss your ideas.

## Feedback

If you have any feedback or suggestions, please reach out via the Issues section of the repository.
