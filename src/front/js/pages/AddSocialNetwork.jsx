import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddSocialNetwork = () =>{
    const { store, actions } = useContext(Context);
    const [ socialNetwork, setSocialNetwork ] = useState("");
    const [ socialNetworkUrl, setSocialNetworkUrl ] = useState("");
    const [ followers, setFollowers ] = useState("");

    const navigate = useNavigate();

    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const social = {
            social_network: socialNetwork,
            social_network_url: socialNetworkUrl,
            followers: followers
        }
        handleAddSocialNetwork(social);
        navigate('/profile')
    }

    const handleAddSocialNetwork = async (social) =>{
        const url = process.env.BACKEND_URL + "/api/social-networks";
        const options = {
            method: "POST",
            body: JSON.stringify(social),
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            },   
        };
        const response = await fetch(url, options);
        if (!response.ok){
            console.log(response.status, response.statusText);
            return
        }
        const data = await response.json();
        console.log(data);
        actions.handleSocialNetworks();
    }

    return(
        <div>
            <h1 className="text-center">AGREGAR RED SOCIAL</h1>
            <div className="d-flex justify-content-center">
                    <div className="m-5 col-8 background_form p-2 rounded">
                    <form onSubmit={handleOnSubmit}>
                    <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Red Social</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={socialNetwork} onChange={(e) => setSocialNetwork(e.target.value)} placeholder="Escribe el nombre de la red social"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputLastName" className="form-label">Cantidad de seguidores</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={followers} onChange={(e) => setFollowers(e.target.value)} placeholder="Coloca la cantidad de seguidores"></input>
  			            </div>
                        </div>
                        <div className="mb-3 text-start mx-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                            value={socialNetworkUrl} onChange={(e) => setSocialNetworkUrl(e.target.value)} placeholder="Copia la URL de tu usuario en la red social"></textarea>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                    </form>
                    <Link to="/profile" className="text-dark">
                            <p className="text-end m-1 me-3 text-dark">O vuelve al perfil.</p>
                    </Link>
                    </div>
            </div>
        </div>
    )
}