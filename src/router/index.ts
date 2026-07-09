import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/Main.vue'
import ServicesView from '../views/Services.vue'
import AboutView from '../views/About.vue'
import MissionView from '../views/Mission.vue'
import ContactView from '../views/Contact.vue'
import NewsList from '../views/News.vue'
import NewsDetail from '../views/NewsView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/mission',
      name: 'mission',
      component: MissionView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactView,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsList,
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: NewsDetail,
    },
  ],
})

export default router
