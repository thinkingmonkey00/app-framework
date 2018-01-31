
// Import Vue
import Vue from 'vue/dist/vue.esm'

// Import F7 Bundle
import Framework7 from 'framework7/dist/framework7.esm.bundle.js'

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'

// Import Pages
//import homePage from '../app/pages/home.vue'

// Init F7-Vue Plugin
Vue.use(Framework7Vue, Framework7)

// Init App
new Vue({
  el: '#app',
  template: `
  <div id="app">
    <!-- Statusbar overlay -->
    <div class="statusbar"></div>

    <!-- Your main view, should have "view-main" class -->
    <div class="view view-main">
      <!-- Initial Page, "data-name" contains page name -->
      <div data-name="home" class="page">

        <!-- Top Navbar -->
        <div class="navbar">
          <div class="navbar-inner">
            <div class="title">Awesome App</div>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="toolbar">
          <div class="toolbar-inner">
            <!-- Toolbar links -->
            <a href="#" class="link">Link 1</a>
            <a href="#" class="link">Link 2</a>
          </div>
        </div>

        <!-- Scrollable page content -->
        <div class="page-content">
          <p>Page content goes here</p>
          <!-- Link to another page -->
          <a href="/about/">About app</a>
        </div>
      </div>
    </div>
  </div>
  `,
  framework7: {
    routes: [
      {
        path: '/',
        content: '<div class="page">...</div>'
      }
    ]
  }
});
