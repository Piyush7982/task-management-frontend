import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Layout from "./layout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

root.render(
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </CookiesProvider>
);
