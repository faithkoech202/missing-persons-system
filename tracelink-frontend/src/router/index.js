import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import AddMissing from '../views/AddMissing.vue';
import FamilyAccess from '../views/FamilyAccess.vue';
import HospitalReport from '../views/HospitalReport.vue';
import LoginPolice from '../views/LoginPolice.vue';
import LoginHospital from '../views/LoginHospital.vue';
import LoginFamily from '../views/LoginFamily.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add-missing', name: 'AddMissing', component: AddMissing },
  { path: '/family-access', name: 'FamilyAccess', component: FamilyAccess },
  { path: '/hospital', name: 'HospitalReport', component: HospitalReport },
  { path: '/login-police', name: 'LoginPolice', component: LoginPolice },
  { path: '/login-hospital', name: 'LoginHospital', component: LoginHospital },
  { path: '/login-family', name: 'LoginFamily', component: LoginFamily }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole'); // e.g. 'police', 'hospital', 'family'

  // Redirect to login if trying to access a protected route without proper role
  if (to.path === '/add-missing' && userRole !== 'police') {
    return next('/login-police');
  }

  if (to.path === '/hospital' && userRole !== 'hospital') {
    return next('/login-hospital');
  }

  if (to.path === '/family-access' && userRole !== 'family') {
    return next('/login-family');
  }

  next();
});

export default router;

