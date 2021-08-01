import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';

import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PasswordListPage from './pages/PasswordListPage';
import PasswordDetailPage from './pages/PasswordDetailPage';

/* eslint-disable react/no-multi-comp */
export const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render: () => {
      return <IntroPage />;
    },
  },
  {
    path: '/sign-up',
    exact: true,
    render: () => {
      return <SignUpPage />;
    },
  },
  {
    path: '/login',
    exact: true,
    render: () => {
      return <LoginPage />;
    },
  },
  {
    path: '/passwords',
    exact: true,
    render: () => {
      return <PasswordListPage />;
    },
  },
  {
    path: '/passwords/:id',
    exact: true,
    render: (props: RouteConfigComponentProps<{ idStr: string }>) => {
      const { match } = props;
      const passwordId = Number.parseInt(match.params.idStr, 10);
      return <PasswordDetailPage passwordId={passwordId} />;
    },
  },
];

/* eslint-enable react/no-multi-comp */
