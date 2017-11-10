# App Framework 2 - Architecture

> This document is part of the [App Framework Documentation](../../README_V2.md#documentation)

<br />

## Coding Rules

- [x] All code must be compliant with the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [x] All JavaScript files must start with `// Purpose: ...`

## Documentation Rules

- [x] All relevant facts must be part of the documentation
- [x] Documentation must be kept short, descriptive and easy to understand
- [x] Documentation must contain examples`
- [x] All folder or file names must be indicated like **this**
- [x] All required user input must be indicated like `this
- [x] All returned values must be indicated like *this*

## Scripts

### File Structure

- [x] Folder **scripts** contains all CLI callable scripts in sub folders
- [x] File naming corresponds to script naming in file **package.json**
- [x] Per sub folder, there is a grouped script in **package.json** file

Example folder **scripts**

```
scripts/
├── update/config.js
├── update/eslint.js
└── config.json
```

Example file **package.json**

```
"scripts": {
  "update": "npm run update:config && npm run update:eslint",
  "update:config": "node scripts/update/config",
  "update:eslint": "node scripts/update/eslint"
}
```

### Common functions and values

- [ ] File **scripts/common.js** provides obligatory functions and values

Runtime information

- [ ] `os` - Current operating system (*mac*, *win* or *linux*)
- [ ] `mode` - Current runtime mode (*development* or *production*)
- [ ] `installed` - App Framework is cloned (*false*) or installed as a module (*true*)

Configuration

- [ ] `cfg.proj` - Contains app project **package.json** file
- [ ] `cfg.app` - Contains app **config.json** file
- [ ] `cfg.pkg` - Contains App Framework **package.json** file
- [ ] `cfg.scripts` - Contains App Framework scripts **config.json** file

Absolute paths

- [ ] `path.proj(...args)` - With app project folder as root
- [ ] `path.app(...args)` - With app folder as root
- [ ] `path.pkg(...args)` - With App Framework package folder as root
- [ ] `path.scripts(...args)` - With App Framework scripts folder as root
- [ ] `path.client(...args)` - With App Framework client folder as root
- [ ] `path.cache(...args)` - With App Framework cache folder as root
- [ ] `path.npm(...args)` - With Node modules folder as root
- [ ] `path.bin(...args)` - With Node modules bin folder as root

Relative path

- [ ] `path.rel(from, to)` - Relative path between two folders

Script execution

- [ ] `cmd(workingDirectory, commands, onSuccess, onError)` - To run a child process

Logging

- [ ] `log.progress(...input)` - To log the progress to the console (input is transformed to JSON)
- [ ] `log.error(...input)`- To log a warning to the console
- [ ] `log.error(...input)` - To log an error to the console and exit the script with status code 1
- [ ] `log.issue(...input)` - To log an error to the console, ask to create and issue and exit the script with status code 1
- [ ] `log.exit(...input)` - To log the progress to the console and exit the script with status code 0
- [ ] `log.debug(...input)` - To log the progress to the console only for app configuration `"debug": true`

### Configuration

- [ ] File **scripts/config.json** contains the script configuration
- [ ] Configuration is prefered over repetitions and parameters in script files

## Client Code

The client code is bundled by Webpack on any dev or build command. In order of relevance:

```
client/
├── mixins/              # Global mixins
├── init.js              # Provides the splash screen, preloading functionality and phone frame handling
├── framework.js         # Loads Framework7/Vue, icon fonts, mixins and attaches the Vue to the window object 
├── app.js               # Loads the app component, the pages, initialize the app and removes the splash screen
└── index.html           # Provides the initial HTML template and the init chunk
```
