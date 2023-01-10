import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList';
import UsersList from './components/users/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import PageNotFound from './components/nav/PageNotFound';
import UsersFooter from '@/components/users/UsersFooter';
import TeamsFooter from '@/components/teams/TeamsFooter';

const app = createApp(App);
const router = createRouter({
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'temas',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          path: ':teamId',
          component: TeamMembers,
          props: true,
          name: 'team-members',
        },
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(_, _2, next) {
        console.log('this is befor enter users page');
       
        next();
      },
    },

    { path: '/:catchAll(.*)', component: PageNotFound },
  ],
  history: createWebHistory(),
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to);
    // console.log(from);
    // console.log(savedPosition);
    if (savedPosition) return savedPosition;
    return { left: 0, top: 0 };
  },
});
router.beforeEach(function (to, from, next) {
  console.log('router beforEach');
  console.log(to, from);
  next(true);
});
app.use(router);
app.mount('#app');
