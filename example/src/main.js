import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { initTray } from './tray'

// Create and mount the Vue app
const app = createApp(App)
app.mount('#app')

// Initialize the system tray
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initTray()
    console.log('System tray initialized')
  } catch (error) {
    console.error('Failed to initialize system tray:', error)
  }
})
