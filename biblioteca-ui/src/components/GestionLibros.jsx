import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';

function GestionLibros() {
    const [libros, setLibros] = useState([]);
    const [isbn, setIsbn] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const fetchLibros = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/libros');
            setLibros(response.data);
        } catch (error) {
            console.error("Error al cargar los libros:", error);
        }
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({ message: '', type: '' });

        if (!isbn || !titulo || !autor) {
            setAlert({ message: 'Todos los campos son obligatorios.', type: 'danger' });
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/libros', { isbn, titulo, autor });
            setAlert({ message: 'Libro agregado con éxito.', type: 'success' });
            // Limpiar formulario y recargar lista
            setIsbn('');
            setTitulo('');
            setAutor('');
            fetchLibros();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al agregar el libro.';
            setAlert({ message: errorMessage, type: 'danger' });
        }
    };

    return (
        <div className="container mt-4">
            {/* Formulario para agregar libros */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Agregar Nuevo Libro</h4>
                    <form onSubmit={handleSubmit}>
                        {/* Campos del formulario: ISBN, Título, Autor */}
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="isbn" className="form-label">ISBN</label>
                                <input type="text" className="form-control" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="titulo" className="form-label">Título</label>
                                <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="autor" className="form-label">Autor</label>
                                <input type="text" className="form-control" id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar Libro</button>
                    </form>
                    <div className="mt-3">
                        <Alert message={alert.message} type={alert.type} />
                    </div>
                </div>
            </div>

            {/* Tabla de libros existentes */}
            <h2 className="mt-5">Inventario de Libros</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ISBN</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro.isbn}>
                            <td>{libro.isbn}</td>
                            <td>{libro.titulo}</td>
                            <td>{libro.autor}</td>
                            <td>
                                <span className={`badge ${libro.estado === 'disponible' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                    {libro.estado}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionLibros;