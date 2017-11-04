// Purpose: Provide consistent app-wide data object

import _get from 'lodash/get'
import _set from 'lodash/set'
import _unset from 'lodash/unset'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  data() {
    // Declare data object in root element
    return this === this.$root ? { $dbData: {} } : {}
  },
  created() {
    // Restore data from the local storage
    if (this === this.$root) {
      if (window.localStorage.$dbData) {
        let data = {}
        try {
          data = JSON.parse(window.localStorage.$dbData)
        } finally {
          this.$root.$data.$dbData = data
        }
      }
    }
    // Provide function
    this.$db = (...args) => {
      // Check arguments
      if (args.length < 1 || args.length > 2 || typeof args[0] !== 'string') {
        throw new Error('$db() should have one or two arguments, the first one should be a string')
      // Read data
      } else if (args.length === 1) {
        return _get(this.$root.$data.$dbData, args[0], undefined)
      // Write/Remove data
      } else {
        // Clone current data
        const data = _cloneDeep(this.$root.$data.$dbData)
        // Update data
        if (args[1] !== null) {
          _set(data, args[0], args[1])
        // Remove data
        } else {
          _unset(data, args[0])
        }
        // Update data in Vue object
        this.$root.$data.$dbData = data
        // Update data in local storage
        window.localStorage.$dbData = JSON.stringify(this.$root.$data.$dbData)
        // Return true
        return true
      }
    }
  },
}
