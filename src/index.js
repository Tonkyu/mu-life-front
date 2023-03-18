import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import Result from './Result';
import NoMatch from './NoMatch';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route index element={<App />} />
    <Route path="/result" element={<Result />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
