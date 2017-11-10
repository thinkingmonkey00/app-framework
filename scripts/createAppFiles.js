// Purpose: Create basic app folder if not exists

// Load modules
const env = require('./env')
const fs = require('fs-extra')

// Check if app folder exists
fs.pathExists(env.path.app(), (folderErr, folderExists) => {
  if (folderErr) env.log.issue('Failed to check app folder')
  // App folder does not exists
  if (!folderExists) {
    // Create app folder
    fs.ensureDir(env.path.app(), (createErr) => {
      if (createErr) env.log.issue('Failed to create app folder')
      // Create app.vue file
      const appVueFileContent = [
        '<template>',
        '  <div>',
        '    <f7-view main url="/" />',
        '  </div>',
        '</template>',
      ].join('\n')
      fs.outputFile(env.path.app('app.vue'), appVueFileContent, (errAppVue) => {
        if (errAppVue) env.log.issue('Failed to create app.vue file')
        // Log progress
        env.log.progress('File app.vue created')
        // Create pages/home.vue file
        const pageHomeVueFileContent = [
          '<template>',
          '  <f7-page>',
          '    <f7-navbar :title="$config.appName" />',
          '    <f7-block>',
          '      <f7-button raised fill external href="https://github.com/scriptPilot/app-framework#documentation">Documentation</f7-button>',
          '    </f7-block>',
          '  </f7-page>',
          '</template>',
        ].join('\n')
        fs.outputFile(env.path.app('pages/home.vue'), pageHomeVueFileContent, (errHomeVue) => {
          if (errHomeVue) env.log.issue('Failed to create pages/home.vue file')
          // Log progress
          env.log.progress('File pages/home.vue created')
          // Create routes.js file
          const routesJSContent = [
            'import home from \'./pages/home.vue\'',
            '',
            'export default [',
            '  {',
            '    path: \'/\',',
            '    component: home',
            '  }',
            ']',
          ].join('\n')
          fs.outputFile(env.path.app('routes.js'), routesJSContent, (errRoutesJS) => {
            if (errRoutesJS) env.log.issue('Failed to create routes.js file')
            // Log progress
            env.log.progress('File routes.js created')
          })
        })
      })
    })
  }
})
