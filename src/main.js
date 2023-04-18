import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import state manager
import { createPinia } from 'pinia'
import router from './router'
// import pagination package
import VueAwesomePaginate from "vue-awesome-paginate";

// import cookie package
import Vuecookies from "vue-cookies";


const pinia = createPinia()


createApp(App).use(pinia).use(router).use(VueAwesomePaginate).use(Vuecookies, { expires: '7d' }).mount('#app')
