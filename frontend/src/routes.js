import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from './pages/Home/Home';
import Error from './pages/Error/Error';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="*" element={<Error/>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
