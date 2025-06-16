import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import AddMissing from '../views/AddMissing.vue';
import FamilyAccess from '../views/FamilyAccess.vue';
import HospitalReport from '../views/HospitalReport.vue';
import LoginPolice from '../views/LoginPolice.vue';
import LoginHospital from '../views/LoginHospital.vue';
import LoginFamily from '../views/LoginFamily.vue';
import AllMissing from '../views/AllMissing.vue';
import PoliceDashboard from '../views/PoliceDashboard.vue';
import SearchMissing from '../views/SearchMissing.vue';
import MatchUnidentified from '../views/MatchUnidentified.vue';
import SearchUnidentified from '../views/SearchUnidentified.vue';
import AllUnidentified from '../views/AllUnidentified.vue';


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add-missing', name: 'AddMissing', component: AddMissing },
  { path: '/family-access', name: 'FamilyAccess', component: FamilyAccess },
  { path: '/hospital-report', name: 'HospitalReport', component: HospitalReport },
  { path: '/login-police', name: 'LoginPolice', component: LoginPolice },
  { path: '/login-hospital', name: 'LoginHospital', component: LoginHospital },
  { path: '/login-family', name: 'LoginFamily', component: LoginFamily },
  { path: '/all-missing', name: 'AllMissing', component: AllMissing },
  { path: '/police-dashboard', name: 'PoliceDashboard', component: PoliceDashboard },
  {path: '/missing/:id',name: 'MissingPersonDetails',  component: () => import('../views/MissingPersonDetails.vue')},
  {path: '/missing/:id/edit',name: 'UpdateMissing',component: () => import('../views/UpdateMissing.vue')},
  { path: '/search-missing', name: 'SearchMissing', component: SearchMissing },
  { path: '/match-unidentified', name: 'MatchUnidentified', component: MatchUnidentified },
  { path: '/search-unidentified', name: 'SearchUnidentified', component: SearchUnidentified },
  { path: '/hospital-dashboard', name: 'HospitalDashboard', component: () => import('../views/HospitalDashboard.vue') },
  { path: '/all-unidentified', name: 'AllUnidentified', component: AllUnidentified },
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

