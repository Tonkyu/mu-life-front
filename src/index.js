import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import Result from './Result';
import NoMatch from './NoMatch';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = document.getElementById('root');
render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route index element={<App />} />
    <Route path="/result" element={<Result />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  root
);
