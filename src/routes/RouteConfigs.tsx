import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Profile } from '../pages/Profile/Profile';
import { Login } from '../pages/Login/Login';
import { Users } from '../pages/Users/Users';
import { Layout } from '../components/layout/Layout';
import { RequireAuth } from './RequiredAuth';

export const RouteConfigs: React.VFC = () => (
  <Routes>
    <Route path="/" element={<Navigate replace to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route element={<Layout />}>
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <Users />
          </RequireAuth>
        }
      />
    </Route>
  </Routes>
);
