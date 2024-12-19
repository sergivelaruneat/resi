const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

// Crear un nuevo usuario
router.post('/register', createUser);

// Obtener todos los usuarios
router.get('/', getAllUsers);

// Obtener un usuario por ID
router.get('/:id', getUserById);

// Obtener un usuario por username
router.get('/username/:username', getUserByUsername);

// Actualizar un usuario
router.put('/:id', updateUser);

// Eliminar un usuario
router.delete('/:id', deleteUser);



module.exports = router;
