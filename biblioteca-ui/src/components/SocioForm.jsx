import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert';

function SocioForm({ onSocioAdded }) {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: '', type: '' }); // Limpia la alerta anterior

    if (!dni || !nombre) {
      setAlert({ message: 'El DNI y el nombre son obligatorios.', type: 'danger' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/socios', { dni, nombre });
      onSocioAdded(response.data); // Llama a la función del padre para actualizar la lista
      setAlert({ message: 'Socio agregado con éxito.', type: 'success' });
      setDni('');
      setNombre('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al agregar el socio.';
      setAlert({ message: errorMessage, type: 'danger' });
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">Agregar Nuevo Socio</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del socio"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dni" className="form-label">DNI</label>
            <input
              type="text"
              className="form-control"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Documento Nacional de Identidad"
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar Socio</button>
        </form>
        <div className="mt-3">
          <Alert message={alert.message} type={alert.type} />
        </div>
      </div>
    </div>
  );
}

export default SocioForm;