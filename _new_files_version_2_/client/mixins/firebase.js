// Purpose: Initilalize to Firebase and provide shortlinks in all Vue components

// Import Firebase
import firebase from 'firebase'

// Export Vue mixin
export default {
  created() {
    // Initilalize Firebase in root component
    if (this === this.$root) {
      const fb = firebase.initializeApp(this.$config.firebase[this.$mode])
      this.$fireAuth = fb.auth()
      this.$fireDB = path => fb.database().ref(path)
      this.$fireStore = path => fb.storage().ref(path)
    // Create shortlinks in all other components
    } else {
      this.$fireAuth = this.$root.$fireAuth
      this.$fireDB = this.$root.$fireDB
      this.$fireStore = this.$root.$fireStore
    }
  },
}
