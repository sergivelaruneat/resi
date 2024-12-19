import { Link } from "react-router-dom";
import { Children } from "react";

interface DefaultNavBarProps{
    children: React.ReactNode;
}

export default function DefaultNavBar({children}:DefaultNavBarProps) {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button 
                            className="navbar-toggler" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav" 
                            aria-controls="navbarNav" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/features">Features</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ListadoAlumnos">Listado</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
