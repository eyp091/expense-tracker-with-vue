import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Vue uygulamasını oluşturup #app elementine mount ediyoruz
const app = createApp(App);
app.use(Toast);

app.mount('#app')