import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/User";
import Home from "../components/Auth";
import UserDetail from "../components/user/UserDetail";
import UserEdit from "../components/user/UserEdit";
import Test from "../components/Test";
import Enroll from "../components/Enroll";
Vue.use(VueRouter);
export const routes = [
    { path: "", component: Home, name: "home" },
    {
        path: "/user/:id",
        components: { default: User, details: UserDetail, test: Test },
        name: "user",
        beforeEnter: (to, from, next) => {
            console.log("IT FIRST GOES TO USER");
            next();
        },
        children: [{ path: "edit", component: UserEdit, name: "edit" }],
    },
    {
        path: "/enroll",
        component: Enroll,
        name: "enroll",
    },
    { path: "*", redirect: "/" },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
