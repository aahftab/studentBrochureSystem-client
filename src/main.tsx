import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PortfolioForm from "./pages/EditProfile.tsx";
import About from "./pages/About.tsx";
import { Toaster } from "@/components/ui/toaster";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import RegisterStudent from "./pages/RegisterStudent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/portfolio/:id",
        element: <Portfolio />,
      },
      {
        path: "/editportfolio",
        element: <PortfolioForm />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [{
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/registerstudent",
      element: <RegisterStudent />,
    }],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
