import React from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";

const Routes = (
  <Route errorElement={<h1>Error</h1>}>
    <Route path="*" element={<NotFound />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About</div>} />
    </Route>
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
  </Route>
);

export default createRoutesFromElements(Routes);
