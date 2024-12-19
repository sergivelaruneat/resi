import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import '../styles/Login.css';
import { useAuth } from "../auth/AuthProvider";
import {API_URL} from "../../constants"

export default function Login() {

    const [formData, setFormData] = useState({
        correoElectronico: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita el comportamiento por defecto de enviar el formulario

        const { correoElectronico, password } = formData;

        // Validación de campos
        if (!!!correoElectronico || !!!password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correoElectronico, password }),
            });

            if (response.ok) {
                console.log("Usuario autenticado");
                window.location.href = "/Home";
            } else {
                const responseData = await response.json();
                setError(responseData.message || "Error al iniciar sesión");
            }
        } catch (error) {
            setError("Error de red. Intenta de nuevo más tarde.");
            console.error("Error al enviar la solicitud", error);
        }
    };

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
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img
                                                src="/src/assets/logo.png"
                                                style={{ width: '185px' }}
                                                alt="logo"
                                            />
                                            <h4 className="mt-1 mb-5 pb-1">
                                                Bienvenido a nuestra universidad, TÚ universidad
                                            </h4>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="correoElectronico">Correo electrónico</label>
                                                <input
                                                    type="email"
                                                    id="correoElectronico"
                                                    className="form-control"
                                                    name="correoElectronico"
                                                    placeholder="Correo electrónico"
                                                    value={formData.correoElectronico}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Contraseña</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder="Contraseña"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Mostrar el error si existe */}
                                            {error && (
                                                <div className="alert alert-danger">
                                                    {error}
                                                </div>
                                            )}

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    type="submit"
                                                >
                                                    Iniciar sesión
                                                </button>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">¿No tienes cuenta?</p>
                                                <Link to="/signup" className="btn btn-outline-danger">Regístrate</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">¡Más que una residencia!</h4>
                                        <p className="small mb-0">
                                            ¡Bienvenido a la página de la Residencia Universitaria.
                                            Descubre un espacio diseñado para tu comodidad, convivencia y crecimiento.
                                            Vive una experiencia única mientras estudias y construyes amistades duraderas.
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
    