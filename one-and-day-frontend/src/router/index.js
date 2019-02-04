import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
import store from '../store';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: () =>
                import ('../views/login.vue'),
        },
        {
            path: '/home',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/homePage.vue'),
        },
        {
            path: '/test',
            name: 'test',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/test.vue'),
        },

    ],
});

router.beforeEach((to, form, next) => {
    if (to.name === 'login') {
        next();
    } else {
        // console.log(store.getters.token);
        // if (store.getters.token) {
        Vue.prototype.socket.emit('checkAuth', (res) => {
            if (res && res.code === 0) {
                next();
            } else {
                Message.error(res.message);
                next('/');
            }
        });
        // } else {
        //     next('/');
        // }
    }
});

export default router;
