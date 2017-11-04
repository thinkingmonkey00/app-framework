// Purpose: Load app configuration and provide a shortlink in all Vue components

import appConfig from '../../app/config.json'

export default {
  created() {
    this.$config = appConfig
  },
}
