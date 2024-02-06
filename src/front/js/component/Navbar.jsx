import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import Icono from '../../img/Icono.png';
import '../../styles/Navbar.css'
import { BtnNotifications } from "./BtnNotifications.jsx";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();


	const handleOnClick= () => {
		actions.logout();
		navigate("/")
	}
	
	return (
		<div className="col-12">
			<nav className="navbar navbar-expand-lg ColorNavbar">
				<div className="container col-xs-9">
						<Link to="/">
						<img className= "imagen ms-5" src= {Icono} alt="personajes" style={{ width: 150 }}/>
						</Link>
						<Link to={"/offers"}>
						<button type="button" className="btn btn-light color-button"><span>Offers</span></button>
						</Link>
				</div>
					
				<div className="col-xs-6">
					<div className="ml-auto">
						{ !store.isLoggedIn ? 
						<div className="d-flex container-fluid">
						<Link to="/login">
							<button className="btn btn-warning me-3"><span>Inicio Sesion</span></button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-warning me-5"><span>Registrarse</span></button>
						</Link>
						</div>
						: 
						<div>
						<BtnNotifications />
						<div className="container-fluid">
						<div className="collapse navbar-collapse">
						  <ul className="navbar-nav">
							<li className="nav-item dropdown">
							  <button className="btn dropdown-toggle me-5" data-bs-toggle="dropdown" aria-expanded="false"><span>Menu</span></button>
							  <ul className="dropdown-menu ">	
								<li>
								<Link to={"/profile"} className="dropdown-item"><span>Perfil</span></Link>
								</li> 
									{store.isInfluencer ? 
								<li>
									<Link to={"/offer-candidates"} className="dropdown-item"><span>Mis Ofertas influencer</span></Link> 
									</li>
									: 
									<li>
									<Link to={`/company/my-offers`} className="dropdown-item"><span>Mis ofertas publicadas</span></Link>
									</li>
									}
								<li>
								<li>
     							 
    							</li>
                 				<hr className="dropdown-divider" />
								<li>
								<span className="dropdown-item text-danger" onClick={handleOnClick}>Log out</span>
								</li>
								</li>
							  </ul>
							</li>
						  </ul>
						</div>
					  </div>
					  </div>
					  } 
					</div>
				</div>
			</nav>
		</div>
);
};