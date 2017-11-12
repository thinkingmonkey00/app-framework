// Purpose: Update app/routes.json file according the pages folder

// Import modules
const env = require('./env')
const rread = require('readdir-recursive')
const fs = require('fs-extra')
const _ = require('lodash')

// Define routes file
const routesFile = env.path.app('routes.js')

// Read old routes file
let oldRoutes = {}
if (fs.existsSync(routesFile)) {
  // Read file
  const str = fs.readFileSync(routesFile, { encoding: 'utf8' })
  // Search for array
  const search = /\[([\s\S]+)\]/.exec(str)
  let res = search ? `[${search[1].trim()}]` : '[]'
  // Remove commata, added by ESLint
  res = res.replace(/,\n( )*}/g, '\n$1}')
  res = res.replace(/,]/g, ']')
  // Add missing quotation marks
  res = res.replace(/\n( )*(.+):/g, '\n$1"$2":')
  res = res.replace(/:( )*([a-zA-Z0-9_-]+)(,)?\n/g, ':$1"$2"$3\n')
  // Replace single quatations marks
  res = res.replace(/'/g, '"')
  // Parse to JSON
  try {
    res = JSON.parse(res)
    oldRoutes = res
  } catch (err) {
    res = []
  }
}

// Read files in pages folder
const files = rread.fileSync(env.path.app('pages'))

// Create array for routes
const routes = []

// Loop files
files.forEach((file) => {
  // Get file name relative to pages folder
  const fileName = file.substr(env.path.app('pages').length + 1)
  // Get component name
  const component = fileName.replace(/\.vue$/, '')
  // Define new route object
  const newRoute = {
    path: `/${component}/`,
    component,
  }
  // Copy old login value
  if (_.find(oldRoutes, { path: newRoute.path, login: true })) newRoute.login = true
  // Add route to routes array
  routes.push(newRoute)
})

// Create new file content
let fileContent = ''

// Add import statements
routes.forEach((route) => {
  fileContent += `import ${route.component} from './pages/${route.component}.vue'\n`
})
fileContent += '\n'

// Add routes as export
fileContent += `export default ${JSON.stringify(routes, null, 2)}\n`

// Remove quotation marks from components
fileContent = fileContent.replace(/("component": )"([a-zA-Z0-9_-]+)"/g, '$1$2')

// Update routes.js file
fs.writeFile(routesFile, fileContent, (err) => {
  if (err) env.log.error('Failed to update app/routes.js file')
  // Backdate file date (Workaround for Webpack Dev Server Compiling loop issue)
  const backdate = (Date.now() / 1000) - 5
  fs.utimesSync(routesFile, backdate, backdate)
  // Log progress
  env.log.progress('Updated app/routes.js file')
})
