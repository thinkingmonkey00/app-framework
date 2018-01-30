# Architecture

## Rules

### Documentation

- Documentation is written decriptive
- Headlines are written in Title Case
- List items end without a point
- User inputs are formatted as `code`
- Folder and file names are formatted *italic*
- JavaScript code is enclosed with ` ```js ... ``` `

### Code

- Code follows [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Folder Structure

... some hints ...

- .babelrc - needed by ESLint

## Scripts

- Script names in *package.json* are written in camel-case (e.g. `test-eslint`)
- Script names correspond to their file name (e.g. *scripts/test-eslint.js*)
- Scripts are called with the babel-cli to support full ES6 features like `import/export`
  (e.g. `node_modules/.bin/babel-node scripts/test-eslint`)
- Each script imports the common module first (e.g. `import com from './common'`)
  - To log frequently
    - Errors with `com.log.error(text)` if something is interrupting the script execution
    - Warnings with `com.log.warning(text)` if something is not as expected
    - Info with `com.log.error(text)` if something is worth to know for the user
    - Debug info with `com.log.error(text)` if something might be helpful for troubleshooting
  - To get an absolute path, relative to the project folder, with `com.path(text)`
  - To write JSON to a file with `com.writeJson(file, json)`
  - To remove folder or files with `com.remove(path)`
- Scripts can use a sub folder in the *cache* folder for temporary data (e.g. *.temp/test-eslint/...*)
