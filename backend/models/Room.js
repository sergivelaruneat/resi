const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    number: { type: Number, required: true, unique: true },  // Número de la habitación
    status: { type: String, required: true, enum: ['ocupada', 'libre'], default: 'libre' },  // Estado de la habitación
    occupant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }  // Referencia al usuario que ocupa la habitación
});

module.exports = mongoose.model('Room', RoomSchema);
