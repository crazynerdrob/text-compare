# TextDiff - Premium Text Comparison Tool

A lightweight, premium-styled web application for comparing text differences. Built with Vanilla JS for maximum performance and zero build dependencies.

![TextDiff Preview](screenshot.png)

## Features

- **Dual View Modes**:
  - **Split View**: Side-by-side comparison (default).
  - **Unified View**: Inline line-by-line comparison.
- **Visual Feedback**: Clear green/red highlighting for additions and deletions.
- **Premium UI**: Dark mode, glassmorphism effects, and smooth animations.
- **Privacy Focused**: All comparison happens locally in your browser. No data is sent to any server.

## Quick Start

Since this project uses standard HTML/CSS/JS, you don't need `npm` or a build step to run it.

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/text-compare.git
    ```
2.  Navigate to the project folder:
    ```bash
    cd text-compare
    ```
3.  Open `index.html` in your web browser.

## Project Structure

- `index.html`: Main application entry point and layout.
- `style.css`: All styling, including the design system and glassmorphism effects.
- `script.js`: Core logic for text comparison and UI interaction.

## Technologies

- **HTML5**
- **CSS3** (Variables, Flexbox, Grid, Animations)
- **JavaScript** (ES6+)
- **jsdiff** (v5.1.0 via CDN) - For computing text differences.

## License

MIT
