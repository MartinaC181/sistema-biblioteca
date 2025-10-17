import React, { useState } from 'react';
import GestionSocios from './components/GestionSocios'; // Crearemos este componente ahora
import GestionLibros from './components/GestionLibros';
import GestionPrestamos from './components/GestionPrestamos';

function App() {
  const [activeTab, setActiveTab] = useState('socios');

  const renderContent = () => {
    switch (activeTab) {
      case 'libros':
        return <GestionLibros />;
      case 'prestamos':
        return <GestionPrestamos />;
      case 'socios':
      default:
        return <GestionSocios />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">📚 Sistema de Gestión de Biblioteca</span>
        </div>
      </nav>
      
      <div className="container">
        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'socios' ? 'active' : ''}`} onClick={() => setActiveTab('socios')}>
              Gestionar Socios
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'libros' ? 'active' : ''}`} onClick={() => setActiveTab('libros')}>
              Gestionar Libros
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'prestamos' ? 'active' : ''}`} onClick={() => setActiveTab('prestamos')}>
              Préstamos y Devoluciones
            </button>
          </li>
        </ul>

        <div className="content mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Componente Wrapper para Socios
function GestionSocios() {
    const [socios, setSocios] = useState([]);

    const fetchSocios = async () => {
        const response = await axios.get('http://localhost:3000/api/socios');
        setSocios(response.data);
    };

    useEffect(() => {
        fetchSocios();
    }, []);

    const handleSocioAdded = (nuevoSocio) => {
        setSocios([...socios, nuevoSocio]);
    };
    
    // El código de SocioList y SocioForm ya lo tienes.
    // Para simplificar, aquí unificamos todo.
    return (
        <div className="container mt-4">
            <SocioForm onSocioAdded={handleSocioAdded} />
            <h2 className="mt-5">Lista de Socios</h2>
            <table className="table table-striped">
                <thead>
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
    );
}


export default App;