
// Import Vue
import Vue from 'vue/dist/vue.esm';

// Import F7 Bundle
import Framework7 from 'framework7/dist/framework7.esm.bundle';

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle';

// Import App Component
import app from '../app/app.vue';

// Import Routes
import routes from '../app/routes';

// Init F7-Vue Plugin
Vue.use(Framework7Vue, Framework7);

// Init App
new Vue({ // eslint-disable-line no-new
  el: '#app',
  template: '<app />',
  components: { app },
  framework7: {
    routes: routes
  },
});
