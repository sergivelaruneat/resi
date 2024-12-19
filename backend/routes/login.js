const express = require('express');
const router = express.Router();
const Usuario = require("../models/User");

router.post("/", async(req, res) => {
    const {correoElectronico, password } = req.body;
    
    try {
        const user = await Usuario.findOne({ correoElectronico });
    // Verificar que todos los campos estén presentes
    if (!user || !(await User.comparePassword(password))) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios",
        });
    }
    // Genera tokens
    const accessToken = generateAccessToken(user); // Implementa esta función
    const refreshToken = generateRefreshToken(user); // Implementa esta función

    // Devuelve el usuario y los tokens
    res.status(200).json({
        statusCode: 200,
        user,
        accessToken,
        refreshToken,
    });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Error interno del servidor",
        });
    }
});

module.exports = router;