import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import state manager
import { createPinia } from 'pinia'

// import pagination package
import VueAwesomePaginate from "vue-awesome-paginate";

// import cookie package
import Vuecookies from "vue-cookies";
import home from './components/views/home.vue'


import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const pinia = createPinia()

//create routes

const routes = [
    { path: "/", name: "home", component: home },
    { path: "/Bookmarks", name: "bookmarks", component: () => import("./components/views/bookmarks.vue") },
    { path: "/show/:id", name: "showMovie", component: () => import("./components/views/showMovie.vue") },
]
//initialize routes
const router = createRouter({
    history: createWebHistory(),
    routes
})
createApp(App).use(pinia).use(router).use(VueAwesomePaginate).use(Vuecookies, { expires: '7d' }).mount('#app')
