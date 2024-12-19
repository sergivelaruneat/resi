const mongoose = require('mongoose');
const Room = require('./models/Room');  // Asegúrate de que el modelo de la habitación esté correctamente importado
const User = require('./models/User');  // Modelo de usuario (para asignar un usuario a la habitación)

const rooms = [
    { number: 101, status: 'libre', occupant: null },
    { number: 102, status: 'ocupada', occupant: null },
    { number: 103, status: 'libre', occupant: null },
    { number: 104, status: 'ocupada', occupant: null },
    { number: 105, status: 'libre', occupant: null },
    { number: 106, status: 'ocupada', occupant: null },
    { number: 107, status: 'libre', occupant: null },
    { number: 108, status: 'ocupada', occupant: null },
    { number: 109, status: 'libre', occupant: null },
    { number: 110, status: 'ocupada', occupant: null },
    // Agrega más habitaciones según sea necesario...
];

mongoose.connect('mongodb://localhost:27017/resi', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Conectado a MongoDB');

        // Obtenemos todos los usuarios de la base de datos
        const users = await User.find();  // Buscar todos los usuarios creados previamente

        // Asignamos algunos usuarios a las habitaciones ocupadas
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].status === 'ocupada') {
                // Si la habitación está ocupada, asignamos un usuario aleatorio
                const randomUser = users[Math.floor(Math.random() * users.length)];
                rooms[i].occupant = randomUser._id;  // Asignamos el _id del usuario a la habitación
            }
        }

        // Insertamos las habitaciones en la base de datos
        await Room.insertMany(rooms);

        console.log('Habitaciones insertadas');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });
