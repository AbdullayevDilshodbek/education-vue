import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Main from "@/views/Main";
import User from "@/views/User";
import Subject from "@/views/Subject";
import Teacher from "@/views/Teacher"
import Student from "../views/Student";
import Group from "../views/Group";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
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
