// Práctica 7: aplicación original "Hola Mundo" con conexión real a MySQL.
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = Number(process.env.PORT || 3000);

// En Docker Compose, "db" es el nombre del servicio de MySQL.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'practica7',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'practica7db',
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000,
});

// Página HTML visible en http://localhost:3000.
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Comprueba la conexión con MySQL y registra una visita auténtica en la base.
app.get('/api/saludo', async (_req, res) => {
  try {
    await pool.execute('INSERT INTO visitas (mensaje) VALUES (?)', ['¡Hola Mundo!']);
    const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM visitas');

    res.json({
      mensaje: '¡Hola Mundo desde Node.js y Docker!',
      baseDeDatos: 'MySQL conectada correctamente',
      totalVisitas: rows[0].total,
    });
  } catch (error) {
    console.error('Error consultando MySQL:', error.message);
    res.status(503).json({
      mensaje: 'La aplicación está activa, pero no se pudo consultar MySQL.',
      baseDeDatos: 'Error de conexión',
    });
  }
});

// Endpoint técnico para verificar el estado de la base de datos.
app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ estado: 'ok', mysql: 'conectada' });
  } catch (_error) {
    res.status(503).json({ estado: 'error', mysql: 'no disponible' });
  }
});

// Crear la tabla automáticamente al iniciar por primera vez el proyecto.
async function iniciar() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitas (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      mensaje VARCHAR(100) NOT NULL,
      fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.listen(port, '0.0.0.0', () => {
    console.log(`Aplicación disponible en http://localhost:${port}`);
    console.log('Conexión a MySQL comprobada y tabla visitas preparada.');
  });
}

iniciar().catch((error) => {
  console.error('No se pudo iniciar la aplicación:', error.message);
  process.exit(1);
});
