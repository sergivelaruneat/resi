const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const roomRoutes = require('./routes/rooms');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const signoutRoutes = require('./routes/signout');
const refreshTokenRoutes = require('./routes/refreshToken');
const todosRoutes = require('./routes/todos');
// Usar rutas
app.use('/api/auth', authRoutes); // Autenticación
app.use('/api/users', userRoutes); // Gestión de usuarios
app.use('/api/rooms', roomRoutes); // Gestión de habitaciones
app.use('/api/login', loginRoutes); // Gestión de login
app.use('/api/signup', signupRoutes); // Gestión de signup
app.use('/api/signout', signoutRoutes); // Gestión de signout
app.use('/api/todos', todosRoutes);
app.use('/api/refresToken', refreshTokenRoutes);



const corsOptions = {
    origin: 'http://localhost:5173', // Puerto donde está corriendo tu frontend
    methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
