import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import '../styles/Login.css';
import { useAuth } from "../auth/AuthProvider";
import {API_URL} from "../../constants"

export default function SignUp() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        nacionalidad: '',
        correoElectronico: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    const { nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, password } = formData;

    if (!!!nombre || !!!apellido || !!!fechaNacimiento || !!!nacionalidad || !!!correoElectronico || !!!password) {
        setError("Por favor, completa todos los campos.");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                apellido,
                fechaNacimiento,
                nacionalidad,
                correoElectronico,
                password,
            }),
        });    
        if (response.ok) {
            console.log("Usuario creado correctamente");
            alert("Usuario creado correctamente, por favor inicia sesión.");
            window.location.href = "/";
        } else {
            const responseData = await response.json();
            setError(responseData.message || "Hubo un error al crear el usuario.");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud", error);
        setError("Error de red. Intenta de nuevo más tarde.");
    }
}

    

    const auth = useAuth();
    if (auth.isAuthenticated){
        return <Navigate to= "/Home"/>
    }

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="container-fluid py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100 w-100">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                {/* Formulario a la izquierda */}
                                <div className="col-lg-6 d-flex align-items-center">
                                    <div className="card-body p-md-5 mx-md-4 w-100">
                                        <div className="text-center">
                                            <img
                                                src="/src/assets/logo.png"
                                                style={{ width: '185px' }}
                                                alt="logo"
                                            />
                                            <h4 className="mt-1 mb-5 pb-1">
                                                Formulario de inscripción
                                            </h4>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <p>Registra tu cuenta</p>
                                            {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                            <div className="row">
                                                {/* Columna 1 */}
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="nombre">Nombre</label>
                                                        <input
                                                            type="text"
                                                            id="nombre"
                                                            className="form-control"
                                                            name="nombre"
                                                            placeholder="Nombre"
                                                            value={formData.nombre}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="apellido">Apellido(s)</label>
                                                        <input
                                                            type="text"
                                                            id="apellido"
                                                            className="form-control"
                                                            name="apellido"
                                                            placeholder="Apellido(s)"
                                                            value={formData.apellido}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>          
                                            </div>

                                            <div className="row">
                                                {/* Columna 2 */}
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                                                        <input
                                                            type="date"
                                                            id="fechaNacimiento"
                                                            className="form-control"
                                                            name="fechaNacimiento"
                                                            value={formData.fechaNacimiento}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="nacionalidad">Nacionalidad</label>
                                                        <input
                                                            type="text"
                                                            id="nacionalidad"
                                                            className="form-control"
                                                            name="nacionalidad"
                                                            placeholder="Nacionalidad"
                                                            value={formData.nacionalidad}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {/* Columna 1 */}
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="correoElectronico">Correo electrónico</label>
                                                        <input
                                                            type="email"
                                                            id="correoElectronico"
                                                            className="form-control"
                                                            name="correoElectronico"
                                                            placeholder="Correo electrónico"
                                                            value={formData.correoElectronico}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Columna 2 */}
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="password">Contraseña</label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            name="password"
                                                            placeholder="Contraseña"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    type="submit"
                                                >
                                                    Registrarse
                                                </button>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">¿Ya tienes cuenta?</p>
                                                <Link to="/" className="btn btn-outline-danger">Iniciar sesión</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Columna adicional de texto */}
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4 w-100">
                                        <h4 className="mb-4">¡Bienvenido a la Residencia Universitaria!</h4>
                                        <p className="small mb-0">
                                            Al completar tu registro, tendrás acceso a todos los beneficios de nuestra Residencia Universitaria. 
                                            Podrás gestionar tu estancia, acceder a servicios exclusivos para estudiantes, 
                                            reservar espacios comunes, y mucho más. Además, tendrás la oportunidad de conectarte con otros estudiantes 
                                            para formar parte de una comunidad activa y un ambiente que fomenta el estudio y la convivencia.
                                            ¡Vive una experiencia única mientras estudias y construyes amistades duraderas!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
