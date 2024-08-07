import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PerfilView from '../views/PerfilView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/perfil', 
      name: 'perfil',
      component: PerfilView,
      props: true
    }
  ]
});

export default router;
