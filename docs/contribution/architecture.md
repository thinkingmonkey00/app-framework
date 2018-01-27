# App Framework Architecture

## Rules

- File name conventions and coding follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)
- Development follows the test-driven approach, with spec files next to the original ones
- Docs are written descriptive, user inputs are formatted as `code`, file names *italic*

## Project Structure

```
├── client/              # Client code for all apps
│   ├── mixins/          # - Mixins / Plugins
│   ├── app.js           # - App initialization
│   ├── init.js          # - Preloader for all resources
│   └── index.html       # - HTML page
├── demo/                # App Framework Demo App files
├── docs/                # App Framework documentation files
├── scripts/             # Scripts for later usage with "npm use ..."
├── config.json          # App Framework configuration file
└── package.json         # App Framework package information file
```

## How it works

- App Framework is installed as NPM module in an empty project folder by the end user. After the installation, App Framework completes the project folder to be ready for GitHub publishing and contains a running basic app code base
- The end user calls scripts to support his workflow, which calls in fact files in the App Framwork module scripts folder
- The end user configures plugins, which extends the basic Vue app by mixins, located in the App Framework client code folder
- After App Framework publishes a new version, the end user gets a notification at the dev server and updates App Framwork for each app project
