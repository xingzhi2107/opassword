import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';

import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PasswordListPage from './pages/PasswordListPage';
import CreateEditPasswordPage from './pages/CreateEditPasswordPage';

import AuthPageContainer from './components/AuthRoute';

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
      return (
        <AuthPageContainer>
          <PasswordListPage />
        </AuthPageContainer>
      );
    },
  },
  {
    path: '/passwords/new',
    exact: true,
    render: () => {
      return (
        <AuthPageContainer>
          <CreateEditPasswordPage />
        </AuthPageContainer>
      );
    },
  },
  {
    path: '/passwords/:id',
    exact: true,
    render: (props: RouteConfigComponentProps<{ id: string }>) => {
      const { match } = props;
      const passwordId = Number.parseInt(match.params.id, 10);
      return (
        <AuthPageContainer>
          <CreateEditPasswordPage passwordId={passwordId} />
        </AuthPageContainer>
      );
    },
  },
];

/* eslint-enable react/no-multi-comp */
