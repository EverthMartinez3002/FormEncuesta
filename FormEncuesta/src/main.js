import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane, faPollH, faChartBar, faUsers } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperPlane, faPollH, faChartBar, faUsers)
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store'


const app = createApp(App)

app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
