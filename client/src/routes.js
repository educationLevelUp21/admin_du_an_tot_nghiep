import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import DoanhThu from './pages/DoanhThu';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function Router(props) {


  return useRoutes([
    {
      path: props.pathLogin,
      element: <Login />,
    },
    {
      path: props.pathRegister,
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: props.pathUser, element: <User/> },
        { path: props.pathProducts, element: <Products /> },
        { path: props.pathBlog, element: <Blog /> },
        { path: props.pathDanhThu, element: <DoanhThu /> },
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
