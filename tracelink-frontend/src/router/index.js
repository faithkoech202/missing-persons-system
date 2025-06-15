// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AddMissing from '../views/AddMissing.vue'
import FamilyAccess from '../views/FamilyAccess.vue'
import HospitalReport from '../views/HospitalReport.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add-missing', name: 'AddMissing', component: AddMissing },
  { path: '/family-access', name: 'FamilyAccess', component: FamilyAccess },
  { path: '/hospital', name: 'HospitalReport', component: HospitalReport }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
