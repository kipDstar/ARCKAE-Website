import React from 'react';
// Example route configuration; you can integrate react-router-dom later

export const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Home')) },
  { path: '/about', component: React.lazy(() => import('./pages/About')) },
];
