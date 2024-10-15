import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserManagement from './UserManagement'; // Tu componente de gestión de usuarios
import IncomeManagement from './IncomeManagement'; // Componente de gestión de ingresos (crea este componente)
import ExpenseManagement from './ExpenseManagement'; // Componente de gestión de gastos (crea este componente)
import NavegationMenu from './NavegationMenu'; // Componente de menú de navegación

const App = () => {
  return (
    <Router>
      <div>
        <NavegationMenu />
        <Routes>
          <Route path="/gestion-usuarios" element={<UserManagement />} />
          <Route path="/gestion-ingresos" element={<IncomeManagement />} />
          <Route path="/gestion-gastos" element={<ExpenseManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
