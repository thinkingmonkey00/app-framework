// Purpose: Download Framework7-Vue and merge its kitchen sink in the App Framework demo app
/* eslint-disable no-shadow, consistent-return, prefer-promise-reject-errors */

// Load modules
const env = require('./env')
const fs = require('fs-extra')
const download = require('download-git-repo')
const rread = require('recursive-readdir')
const camelCase = require('camel-case')
const parseRoutesFile = require('./helper/parseRoutesFile')
const createRoutesFile = require('./helper/createRoutesFile')

// Stop process if it is not the App Framework development mode
if (env.isInstalled) env.log.error('This scripts is for App Framework development purpose only')

// Define cache folder and Git repository
const cacheFolder = 'framework7-vue'
const gitRepository = 'github:framework7io/framework7-vue#v2'

// Step: Download Framework7-Vue repository to cache folder
const updateLocalRepo = () => new Promise((resolve) => {
  env.log.progress('Download Framework7-Vue repository - please wait ...')
  fs.emptyDir(env.path.cache(cacheFolder), (err) => {
    if (err) return ('Failed to empty the cache folder')
    // Download the Git repository to the cache folder
    download(gitRepository, env.path.cache(cacheFolder), (err) => {
      if (err) return ('Failed to download Framework7-Vue repository to cache')
      env.log.progress('Downloaded Framework7-Vue repository')
      return resolve()
    })
  })
})

// Step: Update pages in demo app with kitchen sink pages
const updatePages = () => new Promise((resolve, reject) => {
  // Read kitchen sink pages to array
  const sourcePagesFolder = env.path.cache(cacheFolder, 'kitchen-sink/src/pages')
  const destPagesFolder = env.path.app('pages/f7vue')
  rread(sourcePagesFolder, (err, sourcePages) => {
    if (err) return ('Failed to read the Framework7-Vue kitchen sink pages folder')
    // Empty App Framework demo app pages/f7vue folder
    fs.emptyDir(env.path.cache(destPagesFolder), (err) => {
      if (err) return ('Failed to empty the app/pages/f7vue folder')
      // Copy pages files
      sourcePages.forEach((page) => {
        // If it is a .vue file
        if (/\.vue$/.test(page)) {
          try {
            // Transform file name to camelCase
            const newPageName = `${camelCase(page.substr(sourcePagesFolder.length + 1).replace(/\.vue$/, ''), null, true)}.vue`
            // Copy file
            fs.copySync(page, env.path.app(destPagesFolder, newPageName))
          } catch (err) {
            reject('Failed to copy pages files to the app/pages/f7vue folder')
          }
        }
      })
      env.log.progress('Demo app updated with kitchen sink pages')
      return resolve()
    })
  })
})

// Step: Merge kitchen sink routes file to demo app routes file
const updateRoutes = () => new Promise((resolve, reject) => {
  // Parse kitchen sink routes file
  parseRoutesFile(env.path.cache(cacheFolder, 'kitchen-sink/src/routes.js'), (errSource, sourceRoutesFile) => {
    if (errSource) return reject('Failed to parse the Framework7-Vue kitchen sink routes file')
    // Parse App Framework demo app routes file
    parseRoutesFile(env.path.app('routes.js'), (errDest, destRoutesFile) => {
      if (errDest) return reject('Failed to parse the App Framework demo app routes file')
      // Create array with merged imports and routes
      const mergedImports = []
      const mergedRoutes = []
      // Add App Framework imports without existing Framework7-Vue imports
      destRoutesFile.imports.forEach((imp) => {
        if (!/^\.\/pages\/f7vue\//.test(imp.filePath)) mergedImports.push(imp)
      })
      // Add App Framework routes without existing Framework7-Vue routes
      destRoutesFile.routes.forEach((route) => {
        if (!/^\/f7vue\//.test(route.path)) mergedRoutes.push(route)
      })
      // Add new Framework7-Vue imports
      sourceRoutesFile.imports.forEach((imp) => {
        const modifiedImp = imp
        // Transform file name to camelCase and add f7vue sub folder
        modifiedImp.filePath = `./pages/f7vue/${camelCase(modifiedImp.filePath.replace(/^\.\/pages\//, '').replace(/\.vue$/, ''), null, true)}.vue`
        // Prefix f7vue to component name, transform to camelCase
        modifiedImp.componentName = camelCase(`f7vue ${modifiedImp.componentName}`, null, true)
        // Add to merged imports
        mergedImports.push(modifiedImp)
      })
      // Function to prefix routes and components with f7vue
      const prefixRoutes = (routes, isSub = false) => {
        const modifiedRoutes = []
        // Loop routes
        routes.forEach((route) => {
          const modifiedRoute = route
          // Prefix route path with f7vue (not for sub routes and tabs because they are relative)
          if (!isSub) modifiedRoute.path = `/f7vue${modifiedRoute.path}`
          // Prefix f7vue to component name, transform to camelCase
          if (modifiedRoute.component) modifiedRoute.component = camelCase(`f7vue ${modifiedRoute.component}`, null, true)
          // Do the same for sub routes and tabs
          if (modifiedRoute.routes) modifiedRoute.routes = prefixRoutes(modifiedRoute.routes, true)
          if (modifiedRoute.tabs) modifiedRoute.tabs = prefixRoutes(modifiedRoute.tabs, true)
          // Add to merged routes
          modifiedRoutes.push(modifiedRoute)
        })
        // Return modified routes
        return modifiedRoutes
      }
      // Add new Framework7-Vue routes
      prefixRoutes(sourceRoutesFile.routes).forEach((route) => {
        mergedRoutes.push(route)
      })
      // Update routes file in demo app
      createRoutesFile(env.path.app('routes.js'), { imports: mergedImports, routes: mergedRoutes }, (err) => {
        if (err) return reject('Failed to update the app/routes.js file')
        env.log.progress('Demo app routes file merged with new kitchen sink routes')
        return resolve()
      })
    })
  })
})

// Step: Update kitchen sink images in demo app
const updateImages = () => new Promise((resolve, reject) => {
  // Remove f7vue images sub folder in demo app
  fs.remove(env.path.app('images/f7vue'), (err) => {
    if (err) return reject('Failed to empty images/f7vue folder in demo app')
    // Copy images from kitchen sink to demo app
    fs.copy(env.path.cache('framework7-vue/kitchen-sink/img'), env.path.app('images/f7vue'), (err) => {
      if (err) return reject('Failed to copy Framework7-Vue images to demo app folder')
      // Log progress, resolve promise
      env.log.progress('Kitchen sink images updated in demo app folder')
      return resolve()
    })
  })
})

// Step: Update kitchen sink fonts in demo app
const updateFonts = () => new Promise((resolve, reject) => {
  // Remove f7vue fonts sub folder in demo app
  fs.remove(env.path.app('fonts/f7vue'), (err) => {
    if (err) return reject('Failed to empty fonts/f7vue folder in demo app')
    // Copy fonts from kitchen sink to demo app
    fs.copy(env.path.cache('framework7-vue/kitchen-sink/fonts'), env.path.app('fonts/f7vue'), (err) => {
      if (err) return reject('Failed to copy Framework7-Vue fonts to demo app folder')
      // Log progress, resolve promise
      env.log.progress('Kitchen sink fonts updated in demo app folder')
      return resolve()
    })
  })
})

// Step: Update modified CSS file from kitchen sink to demo app folder
const updateCSS = () => new Promise((resolve, reject) => {
  // Read CSS file
  fs.readFile(env.path.cache(cacheFolder, 'kitchen-sink/css/app.css'), { encoding: 'utf8' }, (err, content) => {
    if (err) return reject('Failed to read Framework7-Vue kitchen sink CSS file')
    let newContent = content
    // Prefix font URLs
    newContent = newContent.replace(/url\(("|')?(..)\/fonts\/(.+?)("|')?\)/g, 'url(fonts/f7vue/$3)')
    // Prefix image URLs
    newContent = newContent.replace(/url\(("|')?(..)\/img\/(.+?)("|')?\)/g, 'url(images/f7vue/$3)')
    // Update CSS file in demo app folder
    fs.writeFile(env.path.app('f7vue.css'), newContent, (err) => {
      if (err) return reject('Failed to update Framework7-Vue CSS file in demo app folder')
      // Report progress, resolve
      env.log.progress('Updated Framework7-Vue CSS file in demo app folder')
      return resolve()
    })
  })
})

// Step: Prefix route and image links pages with f7vue
const prefixLinks = () => new Promise((resolve, reject) => {
  rread(env.path.app('pages/f7vue'), (err, pageFiles) => {
    if (err) return reject('Failed to read f7vue pages in demo app folder')
    // Loop pages
    pageFiles.forEach((file) => {
      // Read file content
      let content = ''
      try {
        content = fs.readFileSync(file, { encoding: 'utf8' })
      } catch (err) {
        return reject('Failed to read f7vue page in demo app folder')
      }
      // Prefix href and link tags
      content = content.replace(/( href| link)="(\/)?([a-z])/g, '$1="/f7vue/$3')
      // Correct prefixed http / https links
      content = content.replace(/\/f7vue\/http(s)?:/g, 'http$1:')
      // Correct prefixed tab links
      content = content.replace(/href="\/f7vue\/(.+)" class="tab-link"/g, 'href="/$1" class="tab-link"')
      // Prefix url refs
      content = content.replace(/'img\//g, '\'images/f7vue/')
      // Write new file
      try {
        fs.writeFileSync(file, content)
      } catch (err) {
        return reject('Failed to write f7vue page in demo app folder')
      }
    })
    // Report progress, resolve promise
    env.log.progress('Framework7-Vue demo app pages prefixed successfully')
    return resolve()
  })
})

// Step: Modify kitchen sink home page in demo app
const modifyHomePage = () => new Promise((resolve, reject) => {
  // Read home page file
  fs.readFile(env.path.app('pages/f7vue/home.vue'), { encoding: 'utf8' }, (err, content) => {
    if (err) return reject('Failed to read Framework7-Vue home page in demo app folder')
    let newContent = content
    // Add backlink to navbar
    newContent = newContent.replace(/<f7-navbar/, '<f7-navbar back-link="Back"')
    // Remove theme examples (are accessible from demo home page)
    newContent = newContent.replace(/ {2}<f7-block(.+)>Themes([\s\S]+)<\/f7-list>\n {2}/, '')
    // Update file
    fs.writeFile(env.path.app('pages/f7vue/home.vue'), newContent, (err) => {
      if (err) return reject('Failed to update Framework7-Vue home page in demo app folder')
      // Report progress, resolve
      env.log.progress('Updated Framework7-Vue home page in demo app folder')
      return resolve()
    })
  })
})

// Do steps
updateLocalRepo()
  .then(updatePages)
  .then(updateRoutes)
  .then(updateImages)
  .then(updateFonts)
  .then(updateCSS)
  .then(prefixLinks)
  .then(modifyHomePage)
  .catch(env.log.issue)
