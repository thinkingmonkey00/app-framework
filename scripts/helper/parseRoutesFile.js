// Purpose: Parse Framework7-Vue routes.js file to JSON
// Usage: parseRoutesFile((err, result) => { ... })

// Import modules
const env = require('../env')
const fs = require('fs-extra')
const { matchAll } = require('regex-match-all')

// Export function
module.exports = (filePath, callback) => {
  // Create result json object
  const result = {
    imports: [],
    routes: [],
  }
  // Open routes file
  fs.readFile(filePath, { encoding: 'utf8' }, (err, content) => {
    if (err) return callback(new Error())
    // Exctract import statements
    const imports = matchAll(/import(.+)from(.*)\n/ig, content)
    for (let i = 1; i < imports.length; i += 1) {
      result.imports.push({
        componentName: imports[i][0].trim(),
        filePath: imports[i][1].trim().replace(/("|'|;)/g, ''),
      })
    }
    // Search for routes array
    const arrSearch = /\[([\s\S]+)\]/.exec(content)
    // Take the search result or set default empty array as string
    let arrStr = arrSearch ? `[${arrSearch[1].trim()}]` : '[]'
    // Remove commata, added by ESLint
    arrStr = arrStr.replace(/,\n( )*}/g, '\n$1}')
    arrStr = arrStr.replace(/,(\n| )*]/g, ']')
    // Add missing quotation marks
    arrStr = arrStr.replace(/\n( )*(.+):/g, '\n$1"$2":')
    arrStr = arrStr.replace(/:( )*([a-zA-Z0-9_-]+)(,)?\n/g, ':$1"$2"$3\n')
    // Replace single quatations marks
    arrStr = arrStr.replace(/: '(.+)'/g, ': "$1"')
    // Remove comments
    arrStr = arrStr.replace(/\/\/(.+)\n/g, '')
    // Escape double quotation marks in strings propely
    // (resulting from previous Framework7-Vue kitchen sink merges)
    const str = matchAll(/: "(.+)"/g, arrStr)
    for (let s = 1; s < str.length; s += 1) {
      const oldStr = str[s][0]
      // Escape double quotation marks
      const newStr = `: "${oldStr.replace(/"/g, '\\"')}"`
      // Replace template with string
      arrStr = arrStr.replace(`: "${oldStr}"`, newStr)
    }
    // Wrap template strings properly (from original Framework7-Vue kitchen sink route file)
    const tplStr = matchAll(/`([\s\S]+?)`/g, arrStr)
    for (let t = 1; t < tplStr.length; t += 1) {
      const oldTplStr = tplStr[t][0]
      // Escape double quotation marks and remove line breaks
      const newTplStr = `"${oldTplStr.replace(/"/g, '\\"').replace(/\n/g, '')}"`
      // Replace template with string
      arrStr = arrStr.replace(`\`${oldTplStr}\``, newTplStr)
    }
    // Parse to JSON
    let arr = []
    try {
      arr = JSON.parse(arrStr)
    } catch (parsingErr) {
      env.log.debug(`JSON parsing error: ${parsingErr}\n${arrStr}`)
      return callback(new Error())
    }
    // Function to harmonize routes
    const harmonizeRoutes = (routes) => {
      const newRoutes = []
      routes.forEach((route) => {
        const newRoute = route
        // Add leading and trailing slash to path
        if (newRoute.path && newRoute.path.substr(0, 1) !== '/') newRoute.path = `/${newRoute.path}`
        if (newRoute.path && newRoute.path.substr(-1) !== '/') newRoute.path += '/'
        // Parse sub routes and tab routes
        if (newRoute.routes) newRoute.routes = harmonizeRoutes(newRoute.routes)
        if (newRoute.tabs) newRoute.tabs = harmonizeRoutes(newRoute.tabs)
        // Add to result
        newRoutes.push(newRoute)
      })
      // Return result
      return newRoutes
    }
    // Harmonize routes
    arr = harmonizeRoutes(arr)
    // Add to result
    result.routes = arr
    // Return result
    return callback(null, result)
  })
}
