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
        <nav className="navbar navbar-expand-lg navbar-light ColorNavbar">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img className="imagenlogo" src={Icono} alt="icono" style={{ width: 105 }} />
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
                    <div className="d-flex">
                        {!store.isLoggedIn ?
                            <div>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link me-3">Inicio Sesion</Link>
                                    </li>
                                        <Link to="/signup" className="nav-link">Registrarse</Link>
                                </ul>
                            </div>
                            :
                            <div className="dropdown me-3 d-sm-none d-md-block">
                                <div className="row">
                                    <div className="col-5"><BtnNotifications /></div>
                                    <div className="col-2"><button className="btn btn-primary dropdown-toggle me-3 mt-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">Menu</button>
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
                                        <span className="dropdown-item" style={{color: "#F47C3C"}} onClick={handleOnClick}><b>Log out</b></span>
                                    </li>
                                </ul></div>
                                    
                                    </div> 
                             
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};