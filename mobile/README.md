# Mobile App (Expo)

This folder contains the React Native mobile app built with Expo. It shares the same backend API as the web app.

## Prerequisites

- Node.js LTS
- Expo CLI (via npx)
- Android Studio (Android emulator) and/or Xcode (iOS simulator) if you want to run on simulators

## Configure API base URL

Set the backend API base URL for devices using an environment variable or edit `app.json`:

- Preferred: set an environment variable before starting Expo:
  - Windows PowerShell:
    - `$env:EXPO_PUBLIC_API_BASE_URL = "http://<your-LAN-IP>:5001/api"`
- Or edit `mobile/app.json` under `expo.extra.apiBaseUrl`.

Note: When testing on a physical device, `localhost` points to the device. Use your computer's LAN IP.

## Install and run

1. Install dependencies
   - From this `mobile` folder, run:
     - `npm install`
2. Start the app
   - `npx expo start`
   - Press `w` for web, `a` for Android, or `i` for iOS (on macOS)

If you see errors about missing web deps, install them:

- `npx expo install react-native-web @expo/metro-runtime`

## Screens

- Home: Search and list words; navigate to Detail; add new word
- Detail: View definition and example; edit or delete
- Edit: Add or update a word

## Troubleshooting

- Metro/TerminalReporter export error: clear cache or reinstall deps
  - `npx expo start --clear`
  - If persists, delete `node_modules` and `package-lock.json`, then `npm install`
- Version mismatches: run `npx expo install --check`

## License

MIT
