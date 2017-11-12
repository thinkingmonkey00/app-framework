# Architecture

> This document is part of the [App Framework Documentation](../../README_V2.md#documentation)

<br />

## Coding Rules

- [x] All code must be compliant with the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [x] All JavaScript files must start with `// Purpose: ...`

## Documentation Rules

Content

- [x] All relevant facts must be part of the documentation
- [x] Documentation must be kept short, descriptive and easy to understand
- [x] Documentation must provide examples

Typography

- [x] Documentation headlines must be written in [Title Case](http://www.grammar-monster.com/lessons/capital_letters_title_case.htm)
- [x] All folder or file names must be indicated like **this**
- [x] All required user input must be indicated like `this`
- [x] All returned values must be indicated like *this*

## Scripts

Sub folders

- [ ] Folder **scripts** contains all CLI callable scripts in sub folders (no ES6 module support)
- [ ] File naming corresponds to script naming in file **package.json**
  - Example: 



```
scripts/
├── .../           # One sub folder per script group (create, update, ...)
├── common.js      # Provides common obligatory functions and values
├── config.json    # Contains script configuration
```







### Sub Folders


- [ ] Per sub folder, there is a grouped script in **package.json** file

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

## Common Functions

- [ ] File **scripts/common.js** provides obligatory [functions and values](commonFunctions.md)

## Configuration

- [ ] File **scripts/config.json** contains the script configuration
- [ ] Configuration is prefered over repetitions and parameters in script files

## Client Code

- [ ] The client code is bundled with Webpack on any dev or build command

### Folder Structure

```
client/
├── mixins/            # Global mixins
├── app.js             # Loads the app component, the pages, initialize the app and removes the splash screen
├── framework.js       # Loads Framework7/Vue, icon fonts, mixins and attaches the Vue to the window object
├── index.html         # Provides the initial HTML template and the init chunk
├── init.js            # Provides the splash screen, preloading functionality and phone frame handling
└── webpackConfig.js   # Provides the Webpack config for development and production (no ES6 module support)
```

### Loading Sequence

<br />

![Loading Sequence](../../media/loadingSequence.png)
