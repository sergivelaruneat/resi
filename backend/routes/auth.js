const express = require('express');
const {loginUser } = require('../controllers/authController'); // Importar las funciones
const router = express.Router();

// Rutas de autenticación

router.post('/login', loginUser);       // Login de usuarios

module.exports = router;

