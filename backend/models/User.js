const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    nacionalidad: { type: String, required: true },
    correoElectronico: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    } catch (error) {
    next(error);
    }
});

// Método para comparar contraseñas
userSchema.methods.compararPassword = async function (passwordCandidato) {
    return bcrypt.compare(passwordCandidato, this.password);
};

// Método para generar tokens de actualización
userSchema.methods.generarRefreshToken = function () {
    const refreshToken = generarTokenAleatorio(); // Implementa una función para generar un token aleatorio
    this.refreshToken = refreshToken;
    return refreshToken;
};

// Exportar modelo
const Usuario = mongoose.model("Usuario", userSchema);
module.exports = Usuario;
