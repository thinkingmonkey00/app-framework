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
├── .gitignore           # Files to be ignored for Git commits
├── .npmignore           # Files to be ignored while NPM publishing
└── package.json         # App Framework package information file
```

**Automatically created folders and files**

```
├── .cache/              # Cache folder
├── .git/                # Git files
├── build/               # Development and production builds
└── node_modules/        # Node modules folder
```

## How it works

- App Framework is installed as NPM module in an empty project folder by the end user. After the installation, App Framework completes the project folder to be ready for GitHub publishing and contains a running basic app code base
- The end user calls scripts to support his workflow, which calls in fact files in the App Framwork module scripts folder
- The end user configures plugins, which extends the basic Vue app by mixins, located in the App Framework client code folder
- After App Framework publishes a new version, the end user gets a notification at the dev server and updates App Framwork for each app project
-

## Scripts

Scripts support the user's workflow.

- All scripts `npm run {script-name}` have a corresponding file *scripts/{script-name}.js*
- All script files export a default function to enable testing
- All scripts calls the function with `node -e "require(\'./scripts/{script-name}\')()"`
- All script files have a corresponding [Jest](https://facebook.github.io/jest/) test file *scripts/specs/{script-name}.spec.js*
- Helper files could be created as *scripts/helper/{helper-name}.js*
- Helper files export a default function to enable testing
- Helper files have a corresponding [Jest](https://facebook.github.io/jest/) test file *scripts/specs/helper/{helper-name}.spec.js*
- All test files have 100% code coverage
- All files follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-), but
  - with hyphen-type file names
  - with `require/module.exports` instead of `import/export`