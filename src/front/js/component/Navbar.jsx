import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleOnClick= () => actions.logout();
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><i className="fa-solid fa-house"></i></span>
				</Link>
				<div className="ml-auto">
					{ !store.isLoggedIn ? 
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
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
	);
};
