import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//add router
import router from './router'

//add bootstrap
import BootstrapVueNext from 'bootstrap-vue-next'

//bootstrap css style
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

//add bootstrap icons
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(BootstrapVueNext)
app.use(BootstrapIconsPlugin)
app.use(router)
app.mount('#app')
