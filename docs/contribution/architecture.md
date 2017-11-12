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
- [x] Documentation must contain examples

Typography

- [x] Documentation headlines must be written in [Title Case](http://www.grammar-monster.com/lessons/capital_letters_title_case.htm)
- [x] All folder or file names must be indicated like **this**
- [x] All required user input must be indicated like `this`
- [x] All returned values must be indicated like *this*

## Scripts

The scripts are called by the console and provide workflow-supporting functionality.

- [ ] All scripts must be called with Babel Node to support import/export statements
- [ ] All scripts must be saved into sub folders (Example: `test:eslint` to **scripts/test/eslint.js**)
- [ ] File **scripts/common.js** provides obligatory [functions and values](commonFunctions.md)
- [ ] File **scripts/config.json** contains the obligatory script configuration

## Client Code

The client code is everything what is build with Webpack and loaded by the browser or Cordova later on.

Source files

- **index.html** file to show the splash screen and load the **init.js** file
- **init.js** file to provide the phone frame handling and preloading functionality
- **framework.js** file to load Framework7-Vue, the icon fonts and mixins and provide the Vue object
- **app.js** file to load the app component and the pages, initialize the App and hide the splash screen
- **mixins** folder with global Vue mixins to enrich the app with common functionality
- **webpackConfig.js** file to provide the Webpack development and production configurations

Loading Sequence

<br />

![Loading Sequence](../../media/loadingSequence.png)

## Demo App

- [ ] The Demo App covers all App Framework functions, provided by the mixins
- [ ] The Demo App includes the Framework7-Vue kitchen sink for demonstration purposes
