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
		!store.isLoggedIn ?
		<div className="col-12 d-flex justify-content-between">
			<Link to="/">
				<img className= "imagen" src= {Icono} alt="personajes" style={{ width: 150 }}/>
			</Link>
			<Link to="/login">
				<button className="btn btn-primary m-2">Login</button>
			</Link>
		</div>
		:
		<div className="col-12">
			<nav className="navbar navbar-light bg-primary-subtle">
				<div className="container col-6">
					<Link to="/">
					<img className= "imagen" src= {Icono} alt="personajes" style={{ width: 150 }}/>
					</Link>
					<BtnNotifications />
					<div className="ml-auto">
						{ !store.isLoggedIn ? 
						<Link to="/login">
							<button className="btn btn-warning">Login</button>
						</Link>
						:
						<div>
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
							<Link to={"/profile"}>
							<button type="button" className="btn btn-light m-2 color-button">Profile</button>
							</Link>
							<Link to={"/offers"}>
							<button type="button" className="btn btn-light m-2 color-button">Offers</button>
							</Link>
							<span>
							<button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
							</span>
							</div>
						</div>
						}
					</div>
				</div>
			</nav>
		</div>
	);
};
