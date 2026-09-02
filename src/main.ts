import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark'
        }
    },
    license: 'eyJpZCI6Ijc0ZTA5Yjg1LTRjMzUtNDYzZS1iOWZlLWQ3MjE3Y2JmNGMwNyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODgzMzMzMTYsImV4cCI6MTgxOTg2OTMxNn0.ytqfVdP6EDfB4KJ4d0vJemrYgCgn7NGdx2EWy7MhtiVwrRP41jsqpn6Gi6uMHTfa_gs_Fd9POzC7e3hPpahaBw',
})
app.mount('#app')
