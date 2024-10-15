import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    gender: 'Masculino',
    phone: '',
    email: ''
  });

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Ajusta la URL según tu API
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/users', newUser); // Ajusta la URL según tu API
      setShowModal(false);
      setNewUser({ gender: 'Masculino', phone: '', email: '' }); // Reset form
      // Refetch users to get the updated list
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div style={{ background: '#000000', color: 'rgb(114,115,116)' }}>
      <div className="card">
        <div className="card" style={{ background: '#cfad04', margin: '-5px', height: '87px' }}>
          <h1 className="fw-light" style={{ color: 'rgb(0,0,0)', margin: '20px', fontFamily: 'Montserrat, sans-serif' }}>
            USUARIOS
          </h1>
        </div>
        <div className="container d-flex" style={{ margin: '10px' }}>
          <button
            className="btn btn-primary d-flex"
            type="button"
            style={{ color: 'rgb(0,0,0)', background: 'var(--bs-tertiary-bg)', borderColor: 'rgb(255,255,255)', fontFamily: 'Roboto, sans-serif' }}
            onClick={() => setShowModal(true)}
          >
            + Añadir
          </button>
        </div>
        <div className="table-responsive" style={{ margin: '20px', borderRadius: '8px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>CÉDULA</th>
                <th>NOMBRE</th>
                <th>USUARIO</th>
                <th>TIPO</th>
                <th style={{ textAlign: 'center' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td style={{ fontFamily: 'Inter, sans-serif' }}>{index + 1}</td>
                  <td>{user.cedula}</td>
                  <td style={{ fontFamily: 'Inter, sans-serif' }}>{user.nombre}</td>
                  <td style={{ fontFamily: 'Inter, sans-serif' }}>{user.usuario}</td>
                  <td style={{ fontFamily: 'Inter, sans-serif' }}>{user.tipo}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary" type="button" style={{ background: 'var(--bs-table-striped-color)', color: 'rgb(0,0,0)', borderColor: 'rgba(0,0,0,0)', margin: '10px' }}>
                      {/* Icons can be added here */}
                      Actions
                    </button>
                    <button className="btn btn-primary" type="button" style={{ color: 'rgb(0,0,0)', background: 'rgb(0,0,0)', borderColor: 'rgba(0,0,0,0)', margin: '10px' }}>
                      {/* Icons can be added here */}
                      Edit
                    </button>
                    <button className="btn btn-primary" type="button" style={{ background: 'rgb(0,0,0)', color: 'rgb(0,0,0)', margin: '10px' }}>
                      {/* Icons can be added here */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Adding User */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center align-self-center" style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--bs-emphasis-color)', fontSize: '20px' }}>
                  <h4 className="modal-title text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px', fontWeight: 'bold' }}>
                    Registro de Usuario
                  </h4>
                  <button className="btn-close" type="button" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body align-self-center" style={{ height: '230px', width: '330px' }}>
                  <p className="text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: 'bold', height: '10px' }}>Género</p>
                  <select name="gender" value={newUser.gender} onChange={handleInputChange} style={{ width: '300px', height: '30px', fontFamily: 'Roboto, sans-serif', textAlign: 'left', borderRadius: '5px', color: 'var(--bs-emphasis-color)', background: 'rgb(255,255,255)', border: '2px ridge var(--bs-secondary-color)' }}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <p className="text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: 'bold', height: '10px' }}>Teléfono</p>
                  <input type="text" name="phone" value={newUser.phone} onChange={handleInputChange} style={{ borderRadius: '5px', borderStyle: 'solid', width: '300px' }} />
                  <p className="text-center" style={{ fontSize: '16px', fontWeight: 'bold', height: '10px' }}>Email</p>
                  <input type="text" name="email" value={newUser.email} onChange={handleInputChange} style={{ borderStyle: 'solid', borderRadius: '5px', width: '300px' }} />
                </div>
                <div className="modal-footer justify-content-between">
                  <button className="btn btn-light text-start" type="button" onClick={() => setShowModal(false)} style={{ borderColor: 'rgb(0,0,0)', fontFamily: 'Roboto, sans-serif', fontSize: '20px', fontWeight: 'bold', color: 'var(--bs-gray-700)', background: 'rgb(255,255,255)' }}>
                    Volver
                  </button>
                  <button className="btn btn-primary" type="button" onClick={handleSubmit} style={{ background: '#cfad04', borderColor: 'rgb(255,255,255)', fontSize: '20px', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
