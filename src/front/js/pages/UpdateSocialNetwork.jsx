import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


export const UpdateSocialNetwork = () =>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();
    
    const currentSocialNetwork =  store.currentSocialNetwork;
    const [ socialNetwork, setSocialNetwork ] = useState(currentSocialNetwork.social_network);
    const [ socialNetworkUrl, setSocialNetworkUrl ] = useState(currentSocialNetwork.social_network_url);
    const [ followers, setFollowers ] = useState(currentSocialNetwork.followers);


    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const idSocialNetwork = params.idsocialnetwork;
        const obj = {
            social_network: socialNetwork,
            social_network_url: socialNetworkUrl,
            followers: followers
        }
        handleSocialNetwork(obj, idSocialNetwork);
        actions.handleSocialNetworks();
        navigate('/profile')
    }

    const handleSocialNetwork = async(obj, idSocialNetwork) =>{
        const url = process.env.BACKEND_URL + "/api/social-networks/current/" + idSocialNetwork;
        const options = {
            method: "PUT",
            body: JSON.stringify(obj),
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
    }

    return(
        !store.isLoggedIn || !store.isInfluencer == true ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center m-2 title-style mt-5">MODIFICAR RED SOCIAL</h1>
            <div className="d-flex justify-content-center">
                    <div className="m-5 col-8 background_form p-2 rounded" style={{background: "#FFC66B"}}>
                    <form onSubmit={handleOnSubmit}>
                    <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Red Social</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={socialNetwork ? socialNetwork : ""} onChange={(e) => setSocialNetwork(e.target.value)} placeholder="Escribe el nombre de la red social"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputLastName" className="form-label">Cantidad de seguidores</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={followers ? followers : ""} onChange={(e) => setFollowers(e.target.value)} placeholder="Coloca la cantidad de seguidores"></input>
  			            </div>
                        </div>
                        <div className="mb-3 text-start mx-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">URL</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                            value={socialNetworkUrl ? socialNetworkUrl : ""} onChange={(e) => setSocialNetworkUrl(e.target.value)} placeholder="Copia la URL de tu usuario en la red social"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                    </form>
                    <Link to="/profile" className="text-dark">
                            <p className="text-end m-1 me-3 text-dark">O vuelve al perfil.</p>
                    </Link>
                    </div>
            </div>
        </div>
    )
}