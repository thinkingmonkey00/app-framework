# App Framework Architecture

## Rules

- File name conventions and coding should follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)
- Development should follow the test-driven approach, with spec files next to the original ones
- Docs should be written descriptive, user inputs should be formatted as `code`, file names *italic*

## Project Structure

```
├── client/              # Client code for all apps
│   ├── plugins/         # - Plugins
│   ├── app.js           # - App initialization
│   ├── init.js          # - Preloader for all resources
│   └── index.html       # - HTML page
├── demo/                # App Framework Demo App files
├── docs/                # App Framework documentation files
├── scripts/             # Scripts for later usage with "npm use ..."
├── config.json          # App Framework configuration file
└── package.json         # App Framework package information file
```
