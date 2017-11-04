Available CLI command
- `npm run build` - to build application
- `npm run dev` - to start development server with live reload

Available in all components

**System**
- [x] `$()` - Shortlink to [Dom7 library](http://framework7.io/docs/dom.html)
- [x] `$config` - Contains the config.json file content as object    
- [x] `$mode` - Contains the mode, development or production
- [ ] `$lang`
- [ ] `$img`
- [ ] `$native`
- [ ] `$os`
- [ ] `$online`

**Design**
- [x] `$style()` - Get or set the [theme](http://framework7.io/docs/color-themes.html) (`ios` or `md`)
- [ ] `$styleBackground()` - Get or set the [layout color](http://framework7.io/docs/color-themes.html) (`dark`, `light` or `default`)
- [ ] `$styleForeground()` - Get or set the [theme color](http://framework7.io/docs/color-themes.html) (color name)
- [ ] `$statusbarVisibility()` - Get or set the [statusbar visibility](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/) (`true` or `false`)
- [ ] `$statusbarText()` - Get or set the [statusbar text color](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/) (`black` or `white`)
- [ ] `$statusbarBackground()` - Get or set the [statusbar background color](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/) (HEX color code)

**Data handling**
- [x] '$db(path, value)' - to get or set consistent app-wide data
- [x] `$fireAuth` / `$fireDB` / `$fireStore` as shortlinks to Firebase
- [ ] `$user`

By Framework7
- $theme > improved by $style
- $device
- $$ > improved by $

app.vue
- F7 available after `onF7Init` method
- Do not use data attributes, beginning with `$`

pages/\*.vue
- F7 available in any `created()` hook or later
- Do not use data attributes, beginning with `$``

## Development

### Requirements

... to be continuied ...

### Way of Working

Please keep the following way of working when you commit to App Framework.

#### Changes

... to be continuied ...

#### Pull Requests

... to be continuied ...

#### Releases

... to be continuied ...

### Coding Rules

- Start each JavaScript file with a `// Purpose: ...` comment
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/)
  (but without semicolons and without import/export in folder **scripts**)

### Architecture

App Framework is mainly split in three parts - **scripts**, **client code** and the **demo app**.

#### Scripts

Folder **scripts** contains all CLI callable scripts.

- File **scripts/config.json** should contain all the default script configuration
- File **scripts/config.webpack.js** should contain all the Webpack configuration
- Files **scripts/scheme.scripts.json** and **scripts/scheme.app.json** hold the configuration schemes
- Each scripts should require first the **scripts/env.js** file with common obligatory helper:
  - `env.type(input)` - Returns a string with type of the input (string, number, array, object, null, ...)
  - `env.isInstalled` - Is `true` if App Framework is installed as Node module, else `false`
  - `env.path` - Returns absolute path with different roots, accepts no or more strings as arguments
    - `env.path.proj(...args)` - With app project folder as root
    - `env.path.app(...args)` - With app folder as root
    - `env.path.pkg(...args)` - With App Framework package folder as root
    - `env.path.client(...args)` - With App Framework client folder as root
    - `env.path.scripts(...args)` - With App Framework scripts folder as root
    - `env.path.npm(...args)` - With node_modules folder as root
    - `env.path.bin(...args)` - With node_modules/.bin folder as root
    - `env.path.cache(...args)` - With node_modules/.app-framework-cache folder as root
  - `env.cfg` - Returns content of the configuration files (not updated during script runtime)
    - `env.cfg.proj` - From project folder package.json file
    - `env.cfg.app` - From app folder config.json file
    - `env.cfg.pkg` - From App Framework package.json file
    - `env.cfg.scripts` - From App Framework scripts folder config.json file   
  - `env.log` - To log messages to the console and optionally exit the script execution
    - `env.log.progress(...messages)` - Log one or more messages (all messages are transformed to strings)
    - `env.log.warning(...messages)` - Log yellow messages
    - `env.log.error(...messages)` - Log red messages and exit with error code 1
    - `env.log.issue(...messages)` - Log red messages, ask to create an issue and exit with error code 1
    - `env.log.exit(...messages)` - Log messages and exit with default code 0
    - `env.log.debug(...messages)` - Log messages only if env.cfg.app.debug is true (for error details)
- Progress should be logged at the beginning of scripts with runtime > 1s and at the end of each script
- Folder **helper** is for supporting data or functions

#### Client Code

Folder **client** contains the client code as base for each new application project.

- File **client/entry.js** is the Webpack entry point to bundle all client code
- File **client/index.html** is the HTML template around the application
- Folder **client/mixins** contains [global Vue mixins](https://vuejs.org/v2/guide/mixins.html) to extend the client functionality

#### App

Folder **app** contains the application with all specific pages and components.

- File **app/config.json** contains the app configuration
- File **app/app.vue** is the [app layout](https://framework7.io/vue/app-layout.html) - minimum content:
  ```
  <template>
    <div>
      <f7-view main />
    </div>
  </template>
  ```
- Folder **app/pages** contains [page components](https://framework7.io/vue/page.html) - minimal content:
  ```
  <template>
    <f7-page>
      <f7-navbar title="Welcome Page" />
      <f7-block>Hello</f7-block>
    </f7-page>
  </template>
  ```
- File **app/routes** contains the page routes and is updated automatically

After changes to the config.json or routes.js file, you have to restart the development server.

Read more to [single file components](https://vuejs.org/v2/guide/single-file-components.html#ad) and [Framework7-Vue components](https://framework7.io/vue/).
