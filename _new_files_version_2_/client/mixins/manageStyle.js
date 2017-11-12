// Purpose: Provide shortlink function to get or set the style (ios or md): $style()

export default {
  created() {
    // Set initial style as Framework7 parameter
    if (this === this.$root) {
      if (!this.$options.framwork7) this.$options.framework7 = {}
      this.$options.framework7.theme = window.localStorage.$style === 'ios' || window.localStorage.$style === 'md' ? window.localStorage.$style : 'md'
    }
    // Provide function to get or set the style
    this.$style = (newStyle) => {
      // If an input is provided
      if (newStyle) {
        // Check input
        if (newStyle !== 'ios' && newStyle !== 'md') {
          throw new Error('$setstyle accepts only "ios" or "md" as input.')
        }
        // Compare to current style
        const updateRequired = !this.$theme[newStyle]
        // Update required
        if (updateRequired) {
          // Update local storage
          window.localStorage.$style = newStyle
          // Reload page
          window.location.reload()
        }
        // Return success
        return true
      // if no input is provided
      }
      // Return current style
      return this.$style.ios ? 'ios' : 'md'
    }
  },
}
