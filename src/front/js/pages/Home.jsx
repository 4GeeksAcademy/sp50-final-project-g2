import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	const handleOnSubmit = (event) => {
		event.preventDefault();
		handleSignUp();  
		actions.handleInfluencer(isChecked);
	}

	const handleMail = () => {
		actions.validMail(email);
	}

	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};

	const handleSignUp = async () => {
		const url = process.env.BACKEND_URL + "/api/signup";
		const options = {
			method: "POST",
			body: JSON.stringify({email, password, is_influencer: isChecked}),
			headers:{
				"Content-Type": "application/json"
			},   
		};
		const response = await fetch(url, options);
		if (!response.ok){
			console.log(response.status, response.statusText);
			actions.handleUserExist()
		}
		const data = await response.json();
		actions.login(data.access_token, isChecked, data.results.user, data.results.profile);
		actions.handleUser(data.results.user, data.results.profile);
		console.log(data)
	}

	return (
		store.isLoggedIn ? <Navigate to={"/profile"} /> :
		<div className="text-center mt-5">
			<div className="container-fluid d-flex col-10 ">
				<div className="col"> 
					<h1 className="m-2 title-style">¡Te damos la bienvenida a tu comunidad profesional!</h1>
					<form onSubmit={handleOnSubmit}>
  					<div className="mb-3 text-start">
    					<label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
						value={email} onChange={(e) => setEmail(e.target.value)} required></input>
    					<div id="emailHelp" className="form-text">Nunca compartiremos tu email con alguien más.</div>
						<button className="btn btn-primary btn-sm m-1" onClick={handleMail}>Validar mail</button>
						{store.mailValidated ? 
						<div>
						</div>
						:
						<div className="alert alert-danger m-1" role="alert">
  							Por favor, valida el mail antes de continuar.
						</div>
						}
  					</div>
  					<div className="mb-3 text-start">
  					  <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
  					  <input type="password" className="form-control" id="exampleInputPassword1"
					  value={password} onChange={(e) => setPassword(e.target.value)} required></input>
  					</div>
  					<div className="mb-3 form-check text-start">
  					  <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={isChecked} onChange={handleOnChange}></input>
  					  <label className="form-check-label" htmlFor="exampleCheck1">Por favor, si eres influencer haz click aquí.</label>
  					</div>
  					<button type="submit" className={store.mailValidated ? "btn btn-info btn-lg" : "btn btn-info btn-lg disabled" }>Continuar</button>
					</form>
					{store.userExist == false ?
					<div></div>
					:
					<div class="alert alert-warning m-2" role="alert">
  						Usuario existente. Por favor, intente registrarse con otro mail.
					</div>}
					<div className="mt-3 mb-3 text-center d-flex justify-content-center border-top border-secondary">
                    <p className="m-1">¿Ya tienes una cuenta?</p>
                    <Link className="text-dark m-1" to="/login"> Inicia sesión aquí.</Link>
                	</div>
				</div>
				<div className="container col">
					<img src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"></img>
				</div>
			</div>
		</div>
	);
};
