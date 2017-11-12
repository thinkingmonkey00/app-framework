// Purpose: Entry point for vendor client code

// Import Vue, Framework7 and Framework7-Vue
import Vue from 'vue'
import Framework7 from 'framework7/dist/js/framework7.esm.bundle'
import 'framework7/dist/css/framework7.css'
import Framework7Vue from 'framework7-vue/dist/framework7-vue'

// Import mixins
import mixinNodeEnv from './mixins/nodeEnv'
import mixinLoadAppConfiguration from './mixins/loadAppConfiguration'
import mixinDomObject from './mixins/domObject'
import mixinDataObject from './mixins/dataObject'
import mixinManageStyle from './mixins/manageStyle'
import mixinFirebase from './mixins/firebase'

// Use Framework7 and Framework7-Vue
Vue.use(Framework7Vue, Framework7)

// Use mixins
Vue.mixin(mixinNodeEnv)
Vue.mixin(mixinLoadAppConfiguration)
Vue.mixin(mixinDomObject)
Vue.mixin(mixinDataObject)
Vue.mixin(mixinManageStyle)
Vue.mixin(mixinFirebase)

// Attach Vue to window object
window.Vue = Vue
