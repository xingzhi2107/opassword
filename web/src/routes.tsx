import React from 'react';
import HomePage from './pages/HomePage';

export const routes = [
  {
    path: '/',
    exact: true,
    render: () => {
      return <HomePage />;
    },
  },
];
