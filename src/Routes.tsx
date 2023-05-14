export {};
import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';

export const AppRoutes = () => (
  <>
    <Routes>
      {' '}
      <Route path="/" element={<MainPage />} />
    </Routes>
  </>
);
