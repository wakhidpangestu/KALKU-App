# Kalku Desktop App (Electron)

This is the desktop version of the GLBB Calculator, built with Electron.js and React.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```

## Features
- GLBB Calculator
- Dark mode with neon blue accent
- Export to XLSX
- iOS-style loading screen
- All features from the web version

## Folder Structure
- `main.js` - Electron main process
- `preload.js` - Secure IPC bridge
- `src/` - React renderer (UI)

## TODO
- Copy all React components, utils, and styles from the web app into `electron/src`
- Integrate GLBB Calculator UI
- Ensure all features work as desktop app
