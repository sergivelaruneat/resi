const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/resi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.log('Error al conectar a MongoDB', err));

const createUsers = async () => {
  const users = [
    { username: 'juan.perez', name: 'Juan Pérez', password: 'password123', edad: 22 },
    { username: 'maria.garcia', name: 'María García', password: 'password123', edad: 21 },
    { username: 'carlos.sanchez', name: 'Carlos Sánchez', password: 'password123', edad: 23 },
    { username: 'laura.martinez', name: 'Laura Martínez', password: 'password123', edad: 20 },
    { username: 'pedro.lopez', name: 'Pedro López', password: 'password123', edad: 24 },
    { username: 'ana.rodriguez', name: 'Ana Rodríguez', password: 'password123', edad: 22 },
    { username: 'jose.fernandez', name: 'José Fernández', password: 'password123', edad: 23 },
    { username: 'carmen.gonzalez', name: 'Carmen González', password: 'password123', edad: 21 },
    { username: 'luis.hernandez', name: 'Luis Hernández', password: 'password123', edad: 25 },
    { username: 'isabel.perez', name: 'Isabel Pérez', password: 'password123', edad: 20 },
  ];
  await User.insertMany(users);
  console.log('Usuarios creados');
};

const runSeeder = async () => {
  await createUsers();
  mongoose.connection.close();
};

runSeeder();
