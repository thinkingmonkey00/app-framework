/* eslint import/no-extraneous-dependencies: "off" */
import Vue from 'vue';
import Framework7 from 'framework7/dist/framework7.esm.bundle';
import Framework7Vue from 'framework7-vue'; // eslint-disable-line
import app from '../demo/app.vue';
import routes from '../demo/routes';

// Install Plugin
Vue.use(Framework7Vue, Framework7);

// Demo Theme
let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0]; // eslint-disable-line
}

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  components: {
    app,
  },
  render: c => c('app'),
  framework7: {
    id: 'io.framework7.testapp',
    theme,
  },
  routes,
});
