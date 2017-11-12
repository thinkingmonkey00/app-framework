// Purpose: Make Dom7 available in each Vue component with shortlink "$"

export default {
  created() {
    this.$ = this.$$
  },
}
