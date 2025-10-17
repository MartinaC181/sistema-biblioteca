const { Pool } = require('pg');
require('dotenv').config();

let instance;

// El patrón Singleton asegura que solo exista una instancia de la conexión
class DatabaseConnection {
    constructor() {
        if (instance) {
            throw new Error("Ya existe una instancia de la conexión a la base de datos.");
        }
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
        instance = this;
    }

    getPool() {
        return this.pool;
    }
}

// Exportamos una única instancia congelada para que no pueda ser modificada
module.exports = Object.freeze(new DatabaseConnection());