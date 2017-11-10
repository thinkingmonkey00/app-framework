// Purpose: Load app configuration and provide a shortlink in all Vue components

// Path will be updated on postinstall
import appConfig from '../../app/config.json'

export default {
  created() {
    this.$config = appConfig
  },
}
