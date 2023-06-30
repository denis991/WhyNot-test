import Index from '../Pages/index.vue';
import About from '../Pages/About.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/about', name: 'About', component: About },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
