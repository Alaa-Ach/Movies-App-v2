import home from '../views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

//create routes

const routes = [
    { path: "/", name: "home", component: home },
    { path: "/Bookmarks", name: "bookmarks", component: () => import("../views/bookmarks.vue") },
    { path: "/show/:id", name: "showMovie", component: () => import("../views/showMovie.vue") },
]
//initialize routes
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
