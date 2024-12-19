const express = require('express');
const router = express.Router();
const {
    createRoom,
    getAllRooms,
    deleteRoom,
    assignRoomToUser
} = require('../controllers/roomsController');

// Crear una habitación
router.post('/', createRoom);

// Obtener todas las habitaciones
router.get('/', getAllRooms);

// Borrar una habitación
router.delete('/:id', deleteRoom);

// Asignar habitación a un usuario
router.post('/assign', assignRoomToUser);

module.exports = router;

