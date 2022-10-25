import { Navigate, useRoutes } from 'react-router-dom';
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

export default function Router() {
  
  const [pathLogin, setPathLogin] = useState("/login");
  const [pathRegister, setPathRegister] = useState("/register");
  const [pathUser, setPathUser] = useState("aaa");
  const [pathProducts, setPathProducts] = useState("aaa");
  const [pathBlog, setPathBlog] = useState("aaa");
  const [pathDanhThu, setPathDoanhThu] = useState("aaa");



    useEffect(()=>{
      var getUser = localStorage.getItem("User")
      var data = JSON.parse(getUser)
      if(getUser == null ){
        setPathLogin("/login")
        setPathRegister("/register")
        setPathUser("aaa")
        setPathProducts("aaa")
        setPathBlog("aaa")
        setPathDoanhThu("aaa")
        return
      }
      
      if(getUser != null ){
        setPathLogin("aaa")
        setPathRegister("aaa")
        setPathUser("user")
        setPathProducts("products")
        setPathBlog("blog")
        setPathDoanhThu("doanhthu")
        return
      }
    },)

  return useRoutes([
    {
      path: pathLogin,
      element: <Login />,
    },
    {
      path: pathRegister,
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: pathUser, element: <User/> },
        { path: pathProducts, element: <Products /> },
        { path: pathBlog, element: <Blog /> },
        { path: pathDanhThu, element: <DoanhThu /> },
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
