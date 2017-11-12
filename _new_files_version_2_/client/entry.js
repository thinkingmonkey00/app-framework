// Purpose: Entry point for app client code (no vendors)

// Import app component (path will be udpated on postinstall)
import app from '../app/app.vue'

// Import routes (path will be updated on postinstall)
import routes from '../app/routes'

// Export Vue application
export default new window.Vue({
  el: '#app',
  render: c => c('app'),
  components: { app },
  routes,
})
