import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '../components/User.vue';
import Home from '../components/Auth.vue';
import UserDetail from '../components/user/UserDetail.vue';
import UserEdit from '../components/user/UserEdit.vue';
import Test from '../components/Test.vue';
Vue.use(VueRouter);
export const routes = [
    { path: '', component: Home, name: 'home' },
    {
        path: '/user/:id',
        components: { default: User, details: UserDetail, test: Test },
        name: 'user',
        beforeEnter: (to, from, next) => {
            console.log('IT FIRST GOES TO USER');
            next();
        },
        // beforeEnter: (to, from, next) => {
        //     console.log('inside guard');
        //     console.log(to.params.isLoggedIn);
        //     if (to.params.isLoggedIn) next();
        //     else {
        //         console.log('blocked');
        //         next(false);
        //     }
        // },
        children: [
            // {
            //     path: ':id',
            //     component: UserDetail,
            //     name: 'detail',
            //     beforeEnter: (to, from, next) => {
            //         console.log('i am here');
            //         next();
            //     },
            // },
            { path: 'edit', component: UserEdit, name: 'edit' },
        ],
    },
    { path: '*', redirect: '/' }, // wildcard to redirect wrong paths
];

const router = new VueRouter({
    // routes: routes ES5 SYNTHAX
    mode: 'history',
    routes, //ES6 SYNTHAX
});

export default router;
// a
