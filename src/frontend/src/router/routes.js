import { auth, isAdmin, isLoggedIn } from '@/middlewares';

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/index.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
    meta: {
      layout: 'AppLayoutDefault',
      middlewares: [isLoggedIn]
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/orders.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/profile.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
];
