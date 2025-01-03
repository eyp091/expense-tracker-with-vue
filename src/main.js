 // CSS dosyasını import ediyoruz
import './assets/style.css'

// Vue'nun createApp fonksiyonunu import ediyoruz
import { createApp } from 'vue'

// Kök bileşen olan App.vue dosyasını import ediyoruz
import App from './App.vue'

// Vue uygulamasını oluşturup #app elementine mount ediyoruz
createApp(App).mount('#app')