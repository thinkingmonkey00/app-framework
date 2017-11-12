// Purpose: Create Framework7-Vue routes file content from JSON input

// Import modules
const fs = require('fs-extra')
const minify = require('html-minifier')

// Export function
module.exports = (destFilePath, json, callback) => {
  // Create new content string
  let content = ''
  // Add imports
  content += '// Import page components\n'
  json.imports.forEach((imp) => {
    content += `import ${imp.componentName} from '${imp.filePath}'\n`
  })
  content += '\n'
  // Transform routes array to string
  let arrStr = JSON.stringify(json.routes, null, 2)
  // Remove quotation marks
  arrStr = arrStr.replace(/"(component)"(: )"(.+)"/g, '$1$2$3')
  arrStr = arrStr.replace(/"(path)"(: )/g, '$1$2')
  arrStr = arrStr.replace(/"(content)": "(.*)"/g, (match, tag, tpl) => {
    let newTpl = tpl
    // Unescape quotation marks
    newTpl = newTpl.replace(/\\"/g, '"')
    // Minify HTML
    newTpl = minify.minify(newTpl, {
      collapseWhitespace: true,
    })
    // Return item with template string
    return `${tag}: \`${newTpl}\``
  })
  arrStr = arrStr.replace(/"(tabs)"(: )/g, '$1$2')
  arrStr = arrStr.replace(/"(routes)"(: )/g, '$1$2')
  arrStr = arrStr.replace(/"(id)"(: )/g, '$1$2')
  // Add routes to content
  content += `// Export routes array\nexport default ${arrStr}\n`
  // Save routes file
  fs.writeFile(destFilePath, content, (err) => {
    if (err) return callback(new Error())
    return callback(null)
  })
}
