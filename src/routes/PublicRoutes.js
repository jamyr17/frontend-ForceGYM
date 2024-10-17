import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserManagement from '../UserManagement';
import IncomeManagement from '../pages/IncomeManagement'; 
import ExpenseManagement from '../pages/ExpenseManagement'; 
import NavegationMenu from '../components/NavegationMenu';

const PublicRoutes = () => {
  return (
      <div>
        <NavegationMenu />
        <Routes>
          <Route path="/gestion-usuarios" element={<UserManagement />} />
          <Route path="/gestion-ingresos" element={<IncomeManagement />} />
          <Route path="/gestion-gastos" element={<ExpenseManagement />} />
        </Routes>
      </div>
  );
};

export default PublicRoutes;
