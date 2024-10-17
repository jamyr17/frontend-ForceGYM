import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />

        <Route path="/dashboard/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
