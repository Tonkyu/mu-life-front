import React, { useState, createContext } from 'react';
import App from './App';
import Result from './Result';
import NoMatch from './NoMatch';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const CenterContext = createContext();
export const IsDummyContext = createContext();

const RoutesSetting = () => {
  const [isDummy, setIsDummy] = useState(false);
  const [center, setCenter] = useState({lat: 35.6852, lng:139.7528});
  return (
    <IsDummyContext.Provider value={{isDummy, setIsDummy}}>
      <CenterContext.Provider value={{center, setCenter}}>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </CenterContext.Provider>
    </IsDummyContext.Provider>
  )
}

export default RoutesSetting;