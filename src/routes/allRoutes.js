import React from 'react';
import { Redirect } from 'react-router-dom';

//HomePage
import HomePage from '../pages/Home/index';
import AdminPage from '../pages/Admin';

const userRoutes = [
  //dashboard
  { path: '/home', component: HomePage },

  //profile
  //{ path: '/profile', component: userProfile },
  { path: '/admin', component: AdminPage },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/home" /> }
];

const authRoutes = [
  //authencation page
];

export { userRoutes, authRoutes };
