# App Framework 2 Architecture

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

Example file **package.json**

```
"scripts": {
  "update": "npm run update:config && npm run update:eslint",
  "update:config": "node scripts/update/config",
  "update:eslint": "node scripts/update/eslint"
}
```

Example folder **scripts**

```
scripts/
├── update/config.js
├── update/eslint.js
└── config.json
```

### Common functions and values

- [x] File **scripts/common.js** provides common functions and values

Runtime information

- [ ] `os` - Current operating system (*mac*, *win* or *linux*)
- [ ] `mode` - Current runtime mode (*development* or *production*)

### Configuration

- [x] File **scripts/config.json** contains the script configuration
- [x] Configuration is prefered over repetitions and parameters in script files
