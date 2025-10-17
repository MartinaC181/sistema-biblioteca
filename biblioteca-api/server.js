// server.js
const express = require('express');
const socioRoutes = require('./src/routes/socio.routes');
const libroRoutes = require('./src/routes/libro.routes');
const prestamoRoutes = require('./src/routes/prestamo.routes');
const multaRoutes = require('./src/routes/multa.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', socioRoutes);
app.use('/api', libroRoutes);
app.use('/api', prestamoRoutes);
app.use('/api', multaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});