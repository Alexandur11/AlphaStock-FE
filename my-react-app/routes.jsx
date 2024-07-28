// src/Routes.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './src/components/HomePage/HomePage';


// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const RoutesComponent = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default RoutesComponent;
