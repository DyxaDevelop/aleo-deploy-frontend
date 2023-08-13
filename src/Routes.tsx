import styled from '@emotion/styled';
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Board from './chess/src/components/Board/Board';
import { MainPage } from './pages/MainPage/MainPage';
import './chess/src/reset.css';
import './chess/src/index.css';
import { Wallet } from 'pages/Wallet/Wallet';
import { Games } from 'pages/Games/Games';
import { Profile } from 'pages/Profile/Profile';
import { Voting } from 'pages/Voting/Voting';
import { DefaultLayout } from 'layouts/DefaultLayout';
import { Loader } from 'components/Loader/Loader';
import { Chess } from 'pages/Chess/Chess';
import { CreateENS } from 'pages/CreateEns/CreateENS';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

//@ts-ignore
// const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage'));
// const UploadPage = lazy(() => import('./pages/UploadPage'));

export const LoaderContainer = styled.div(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const AppRoutes = () => (
  <>
    <Suspense
      fallback={
        // <DefaultLayout>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
        // </DefaultLayout>
      }
    >
      <Routes>
        {' '}
        <Route path="/" element={<MainPage />} />
        {/* <div className="app"> */}
        <Route path="/games/chess" element={<Chess />} />
        <Route
          path="/games/chess/board"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        <Route path="/games" element={<Games />} />
        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/voting" element={<Voting />} />
        <Route path="/ens" element={<CreateENS />} />
        {/* </div> */}
      </Routes>
    </Suspense>
  </>
);
