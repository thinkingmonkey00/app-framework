// Purpose: Provide NODE_ENV (development or production) as shortlink in all Vue components

export default {
  created() {
    this.$mode = process.env.NODE_ENV
  },
}
