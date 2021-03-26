import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Main from "@/views/Main";
import User from "@/views/User";
import Subject from "@/views/Subject";
import Teacher from "@/views/Teacher"
import Student from "../views/Student";
import Group from "../views/Group";
import Excel from "../views/Excel";
import TabTest from "@/views/TabTest"
import CurrentDebt from "../components/TabChilderen/CurrentDebt"
import Calculation from "../components/TabChilderen/Calculation"
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/users',
        name: 'User',
        component: User
      },
      {
        path: '/subject',
        name: 'Subject',
        component: Subject
      },
      {
        path: '/teacher',
        name: 'Teacher',
        component: Teacher
      },
      {
        path: '/student',
        name: 'Student',
        component: Student
      },
      {
        path: '/group',
        name: 'Group',
        component: Group
      },
      {
        path: '/excel',
        name: 'Excel',
        component: Excel
      },
      {
        path: '/tab',
        name: 'TabTest',
        component: TabTest,
        children: [
          {
            path: '/currentDebt',
            name: 'CurrentDebt',
            component: CurrentDebt
          },
          {
            path: '/calculation',
            name: 'Calculation',
            component: Calculation
          },
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("token");
  const publicPages = ["/login"];
  const notPublicPages = !publicPages.includes(to.path);
  let logged = false;
  if (session) {
    logged = true;
  }
  if (logged && !notPublicPages) {
    next("/");
  } else if (!logged && notPublicPages) {
    next("/login");
  } else {
    next();
  }
});
