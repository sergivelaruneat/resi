const Room = require('../models/Room');
const User = require('../models/User');

// Crear una nueva habitación
const createRoom = async (req, res) => {
    try {
        const { number, status, occupant } = req.body;

        // Verificar si la habitación ya existe
        const roomExists = await Room.findOne({ number });
        if (roomExists) {
            return res.status(400).json({ message: 'La habitación ya existe' });
        }

        // Crear la nueva habitación
        const newRoom = new Room({
            number,
            status,
            occupant,
        });

        await newRoom.save();
        return res.status(201).json({ message: 'Habitación creada exitosamente', newRoom });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al crear la habitación', error: err.message });
    }
};

// Obtener todas las habitaciones
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('occupant', 'name username');
        return res.status(200).json(rooms);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al obtener habitaciones', error: err.message });
    }
};

// Borrar una habitación
const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findByIdAndDelete(roomId);
        
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        return res.status(200).json({ message: 'Habitación eliminada', room });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al eliminar la habitación', error: err.message });
    }
};

// Asignar una habitación a un usuario
const assignRoomToUser = async (req, res) => {
    try {
        const { roomId, userId } = req.body;

        // Encontrar la habitación
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        // Encontrar el usuario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Asignar la habitación al usuario
        room.occupant = user._id;
        room.status = 'ocupada';  // Cambiar el estado a "ocupada"

        await room.save();

        return res.status(200).json({ message: 'Habitación asignada al usuario', room });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al asignar la habitación', error: err.message });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    deleteRoom,
    assignRoomToUser
};
