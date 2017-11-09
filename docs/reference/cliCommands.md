# CLI Commands Reference

> This document is part of the [App Framework Documentation](../../README_V2.md#documentation)

<br />

**Development**

On any development command, tests and file updates run before.

- [x] `npm run dev:web` or `npm run dev` to start the development server with hot-reload in the web browser
- [ ] `npm run dev:ios` to start the iOS emulator with a development build
- [ ] `npm run dev:android` to start the Android emulator with a development build

**Build**

On any build command, tests and file updates run before.

- [ ] `npm run build:patch` or `npm run build` to build version x.y.z+1 after bug-fixes and improvements
- [ ] `npm run build:minor` to build version x.y+1.0 after adding new features
- [ ] `npm run build:major` to build version x+1.0.0 after breacking the backward-capability

**Deployment**

- [ ] `npm run deploy:ftp` to deploy the latest build to any FTP server
- [ ] `npm run deploy:firebase` to deploy the latest build to Firebase Hosting
- [ ] `npm run deploy:ios` to deploy the latest build to Xcode
- [ ] `npm run deploy:android` to deploy the latest build to Android Studio
