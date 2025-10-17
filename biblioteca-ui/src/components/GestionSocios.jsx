import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SocioForm from './SocioForm';

function GestionSocios() {
    const [socios, setSocios] = useState([]);

    const fetchSocios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/socios');
            setSocios(response.data);
        } catch (error) {
            console.error("Error al cargar los socios:", error);
        }
    };

    useEffect(() => {
        fetchSocios();
    }, []);

    const handleSocioAdded = () => {
        // Simplemente volvemos a cargar la lista de socios para que se actualice
        fetchSocios();
    };

    return (
        <div className="container mt-4">
            <SocioForm onSocioAdded={handleSocioAdded} />
            <div className="mt-5">
                <h2>Lista de Socios</h2>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>N° Socio</th>
                            <th>Nombre</th>
                            <th>DNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {socios.map((socio) => (
                            <tr key={socio.numerosocio}>
                                <td>{socio.numerosocio}</td>
                                <td>{socio.nombre}</td>
                                <td>{socio.dni}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GestionSocios;