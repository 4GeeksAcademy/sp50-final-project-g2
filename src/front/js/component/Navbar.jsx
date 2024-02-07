import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import Icono from '../../img/Icono.png';
import '../../styles/Navbar.css';
import { BtnNotifications } from "./BtnNotifications.jsx";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleOnClick = () => {
        actions.logout();
        navigate("/");
    }

	return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img className="imagen" src={Icono} alt="personajes" style={{ width: 150 }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/offers" className="nav-link">Offers</Link>
                        </li>
                    </ul>
                    <BtnNotifications />
                    <div className="d-flex">
                        {!store.isLoggedIn ?
                            <div>
                                <Link to="/login" className="btn btn-warning me-3">Inicio Sesion</Link>
                                <Link to="/signup" className="btn btn-warning">Registrarse</Link>
                            </div>
                            :
                            <div className="dropdown me-3 d-sm-none d-md-block">
                                <button className="btn btn-primary dropdown-toggle me-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Menu
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <Link to="/profile" className="dropdown-item">Perfil</Link>
                                    </li>
                                    {store.isInfluencer ?
                                        <li>
                                            <Link to="/offer-candidates" className="dropdown-item">Mis Ofertas influencer</Link>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/company/my-offers" className="dropdown-item">Mis ofertas publicadas</Link>
                                        </li>
                                    }
                                    <hr className="dropdown-divider" />
                                    <li>
                                        <span className="dropdown-item text-danger" onClick={handleOnClick}>Log out</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};