import { createApp } from 'vue'
import App from './App.vue'
import { initTray } from './tray'
import './style.css'

// Create and mount the Vue app
const app = createApp(App)
app.mount('#app')

// Initialize the system tray
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initTray()
    // eslint-disable-next-line no-console
    console.log('System tray initialized')
  }
  catch (error) {
    console.error('Failed to initialize system tray:', error)
  }
})
