import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
import NotFound from "./components/error-handling/error.notfound";
import ServerError from "./components/error-handling/internal.server.error";
import AuthLayout from "./auth.layout";
import UserPage from "./components/userPage";
import UserProfile from "./components/UserProfile";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="user" element={<AuthLayout />}>
        <Route path="" element={<UserPage />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="signup" element={<Signup />} />
      <Route path="500" element={<ServerError />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
