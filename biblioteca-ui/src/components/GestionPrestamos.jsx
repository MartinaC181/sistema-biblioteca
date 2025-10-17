import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert';

function GestionPrestamos() {
    // Estado para el formulario de préstamo
    const [prestamoIsbn, setPrestamoIsbn] = useState('');
    const [numeroSocio, setNumeroSocio] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');

    // Estado para el formulario de devolución
    const [devolucionIsbn, setDevolucionIsbn] = useState('');
    const [estaDanado, setEstaDanado] = useState(false);

    // Estado para las alertas
    const [prestamoAlert, setPrestamoAlert] = useState({ message: '', type: '' });
    const [devolucionAlert, setDevolucionAlert] = useState({ message: '', type: '' });

    const handlePrestamoSubmit = async (e) => {
        e.preventDefault();
        setPrestamoAlert({ message: '', type: '' });
        try {
            await axios.post('http://localhost:3000/api/prestamos', {
                isbn: prestamoIsbn,
                numeroSocio,
                fechaDevolucion
            });
            setPrestamoAlert({ message: 'Préstamo registrado con éxito.', type: 'success' });
            // Limpiar formulario
            setPrestamoIsbn('');
            setNumeroSocio('');
            setFechaDevolucion('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al registrar el préstamo.';
            setPrestamoAlert({ message: errorMessage, type: 'danger' });
        }
    };

    const handleDevolucionSubmit = async (e) => {
        e.preventDefault();
        setDevolucionAlert({ message: '', type: '' });
        try {
            await axios.post('http://localhost:3000/api/devoluciones', {
                isbn: devolucionIsbn,
                estaDanado
            });
            setDevolucionAlert({ message: 'Devolución registrada correctamente.', type: 'success' });
            // Limpiar formulario
            setDevolucionIsbn('');
            setEstaDanado(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al registrar la devolución.';
            setDevolucionAlert({ message: errorMessage, type: 'danger' });
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Columna para Préstamos */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Registrar Préstamo</h4>
                            <form onSubmit={handlePrestamoSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="prestamoIsbn" className="form-label">ISBN del Libro</label>
                                    <input type="text" className="form-control" id="prestamoIsbn" value={prestamoIsbn} onChange={(e) => setPrestamoIsbn(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numeroSocio" className="form-label">Número de Socio</label>
                                    <input type="number" className="form-control" id="numeroSocio" value={numeroSocio} onChange={(e) => setNumeroSocio(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fechaDevolucion" className="form-label">Fecha de Devolución</label>
                                    <input type="date" className="form-control" id="fechaDevolucion" value={fechaDevolucion} onChange={(e) => setFechaDevolucion(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-success">Registrar Préstamo</button>
                            </form>
                            <div className="mt-3">
                                <Alert message={prestamoAlert.message} type={prestamoAlert.type} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna para Devoluciones */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Registrar Devolución</h4>
                            <form onSubmit={handleDevolucionSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="devolucionIsbn" className="form-label">ISBN del Libro</label>
                                    <input type="text" className="form-control" id="devolucionIsbn" value={devolucionIsbn} onChange={(e) => setDevolucionIsbn(e.target.value)} />
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="estaDanado" checked={estaDanado} onChange={(e) => setEstaDanado(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="estaDanado">
                                        ¿El libro está dañado? (Generará multa)
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-warning">Registrar Devolución</button>
                            </form>
                            <div className="mt-3">
                                <Alert message={devolucionAlert.message} type={devolucionAlert.type} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionPrestamos;