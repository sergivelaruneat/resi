const express = require("express");
const Usuario = require("../models/User"); // Asegúrate de que la ruta sea correcta
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { 
    nombre, 
    apellido, 
    fechaNacimiento, 
    nacionalidad, 
    correoElectronico, 
    password 
  } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({ correoElectronico });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      fechaNacimiento,
      nacionalidad,
      correoElectronico,
      password, // Se encripta automáticamente en el pre("save") del modelo
    });

    // Guardar el usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        nombre: usuarioGuardado.nombre,
        apellido: usuarioGuardado.apellido,
        fechaNacimiento: usuarioGuardado.fechaNacimiento,
        nacionalidad: usuarioGuardado.nacionalidad,
        correoElectronico: usuarioGuardado.correoElectronico,
      },
    });
  } catch (error) {
    console.error("Error en /signup:", error);
    res.status(500).json({ message: "Error en el servidor. Por favor, intenta más tarde." });
  }
});

module.exports = router;
