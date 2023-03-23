import React, { useState, createContext } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesSetting from './RoutesSetting';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
      <RoutesSetting />
  // </React.StrictMode>
);
