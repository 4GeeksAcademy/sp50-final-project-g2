import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { Link, Navigate } from "react-router-dom";
import 'bootswatch/dist/sandstone/bootstrap.min.css';

export const Login = () =>{
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleOnSubmit = async () => {
        const url = process.env.BACKEND_URL + "/api/login";
        const options = {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers:{
                "Content-Type": "application/json"
            },   
        };
        const response = await fetch(url, options);
        if (!response.ok){
            console.log(response.status, response.statusText);
            console.log(email, password);
            return
        }
        const data = await response.json();
        const is_influencer = data.results.user.is_influencer
        const data_user = data.results
        actions.login(data.access_token, is_influencer, data.results.user, data.results.profile);
        actions.handleInfluencer(is_influencer);
        actions.handleUser(data.results.user, data.results.profile);
        actions.isLogged(data.results.user, data.results.profile);
        console.log(data_user);
        console.log(data);
        console.log(response);
    }

    return(
        store.isLoggedIn ? <Navigate to={"/profile"} /> :
        <div>
            <h1 className="m-2 text-center mt-3">Inicia sesión para descubrir #inserte nombre de la app#</h1>
            <div className="d-flex justify-content-center">
            <div className="m-5 col-5 background_form p-2 rounded">
  			    <div className="mb-3 text-start mx-3">
    			    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    			    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				    value={email} onChange={(e) => setEmail(e.target.value)} required></input>
    			    <div id="emailHelp" className="form-text">Nunca compartiremos tu email con alguien más.</div>
  			    </div>
  			    <div className="mb-3 text-start mx-3">
  			      <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
  			      <input type="password" className="form-control" id="exampleInputPassword1"
			      value={password} onChange={(e) => setPassword(e.target.value)} required></input>
  			    </div>
  			    <div className="mb-3 form-check text-start mx-3">
  			      <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
  			      <label className="form-check-label" htmlFor="exampleCheck1">Recordar contraseña</label>
  			    </div>
  			    <button type="submit" className="btn btn-success btn-lg mx-3" onClick={handleOnSubmit}>Submit</button>
                <div className="mt-2 text-center d-flex justify-content-center border-top border-secondary">
                    <p className="m-1">¿No tienes una cuenta?</p>
                    <Link className="text-dark m-1" to="/signup"> Registrate aquí.</Link>
                </div>
            </div>
            </div>
        </div>
    )
}