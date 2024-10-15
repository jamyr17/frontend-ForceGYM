// src/components/IngresosView.js
import React, { useState, useEffect } from 'react';
import '../IncomeView.css';


const IngresosView = () => {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, comprobante: '123849078', nombre: 'Carlos Orellana', detalle: 'Mensualidad', monto: 14500 },
      { id: 2, comprobante: '232580923', nombre: 'Jamyr Gonzalez', detalle: 'Mensualidad', monto: 17000 },
      { id: 3, comprobante: '732340631', nombre: 'Sharon Rosales', detalle: 'Semana', monto: 7000 },
      { id: 4, comprobante: '543036631', nombre: 'Aaron Mastranta', detalle: 'Mensualidad', monto: 17000 },
      { id: 5, comprobante: '132258092', nombre: 'Roger Gonzalez', detalle: 'Mensualidad', monto: 17000 },
      { id: 6, comprobante: '734283327', nombre: 'Gerald Calderón', detalle: 'Semana', monto: 7000 },
      { id: 7, comprobante: '433748348', nombre: 'Jamel Sandi', detalle: 'Mensualidad', monto: 14500 },
    ];
    setIngresos(data);
  }, []);

  return (
    <div className="ingresos-view">
      <header>
        <h1>Ingresos</h1>
        <button>Añadir</button>
      </header>
      <div className="search-bar">
        <input type="text" placeholder="Buscar por..." />
        <button>Filtrar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Comprobante</th>
            <th>Nombre</th>
            <th>Detalle</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso, index) => (
            <tr key={ingreso.id}>
              <td>{index + 1}</td>
              <td>{ingreso.comprobante}</td>
              <td>{ingreso.nombre}</td>
              <td>{ingreso.detalle}</td>
              <td>{ingreso.monto.toLocaleString()}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
                <button className="more-btn">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngresosView;
