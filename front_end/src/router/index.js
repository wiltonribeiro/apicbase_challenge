import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import IngredientManagement from '../views/IngredientManagement.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/ingredient',
        name: 'IngredientManagement',
        component: IngredientManagement,
        props: true
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
