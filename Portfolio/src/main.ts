// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// Import the specific icons you want to use
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

// Add the imported icons to the library
library.add(faGithub, faLinkedin, faTwitter, faEnvelope)

// Create the Vue app instance
const app = createApp(App)

// Register the Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')