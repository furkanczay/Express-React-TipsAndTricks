import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayout from './layout/Mainlayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ArticleDetail from './pages/ArticlesDetail.jsx';
import SignInUp from './pages/SignInUp.jsx';
import { loader as homeLoader } from './pages/HomePage.jsx';
import { loader as detailLoader } from './pages/ArticlesDetail.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: homeLoader
            },
            {
                path: ':id',
                element: <ArticleDetail />,
                loader: detailLoader
            }
        ]
    },
    {
        path: 'signInUp',
        element: <SignInUp />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
