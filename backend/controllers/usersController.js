const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { username, name, password, edad } = req.body;
    try {
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const newUser = new User({
            username,
            name,
            password,
            edad
        });
        await newUser.save();
        res.status(201).json({ msg: 'Usuario creado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al crear el usuario' });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Obtener todos los usuarios
        res.json(users); // Devolver la lista de usuarios
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener el usuario' });
    }
};

// Obtener un usuario por username
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener el usuario' });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password, edad } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        user.name = name || user.name;
        user.password = password || user.password;
        user.edad = edad || user.edad;

        // Encriptar la nueva contraseña si se actualiza
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ msg: 'Usuario actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await user.remove();
        res.json({ msg: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
};
