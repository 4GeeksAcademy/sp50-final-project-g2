import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const data = store.user;
    console.log(data);
    console.log(store.profile);
    

    const handleOnClick= () => actions.logout();

    const handleDeleteSocialNetwork = async(item) =>{
        const url = process.env.BACKEND_URL + "/api/social-networks/current/" + item;
        const options = {
            method: "DELETE",
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

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center title-style mt-5">Mi Perfil</h1>
            { store.isInfluencer == true ? 
            <div className="text-center">
                { !store.user || !store.profile ? 
                <Spinner />
                :
                <div>
                <h2 className="title-style text-center"></h2>
                <Link to="/update-profile" className="text-secondary">
                    <p className="text-end m-1 me-5"><i className="fa-regular fa-pen-to-square fa-xl"></i></p>
                </Link>
                <div className="container-fluid d-flex mt-3 justify-content-center">
                    <div className="col-3 me-3">
                        <img src={store.profile.profile_img ? store.profile.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"}  style={{objectFit: "cover", aspectRatio: "1/1", width: "100%", border: "solid", borderWidth: "4px", borderColor: "#FFC66B", imageRendering: "high-quality"}} className="avatar-img rounded-circle" alt="Profile Image"/>
                        <h3 className="m-2"><strong>{store.profile.headline}</strong></h3>
                        <h4 className="m-2">Principal red social: <strong>{store.profile.social_networks}</strong></h4>
                    </div>
                    <div className="col-sx-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-grid background_form justify-content-start text-start ps-5 ms-1" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                        <h4 className="m-2 mt-3"><strong>Datos personales</strong></h4>
                        <p className="m-2">Nombre: <strong> {store.profile.first_name} </strong></p>
                        <p className="m-2">Apellido/s: <strong> {store.profile.last_name} </strong></p>
                        <p className="m-2">Email: <strong> {store.user.email} </strong></p>
                        <p className="m-2">Fecha de nacimiento: <strong> {(new Date(store.profile.date_birth)).toLocaleDateString()} </strong></p>
                        <p className="m-2">Género: <strong> {store.profile.gender} </strong></p>
                        <p className="m-2">Teléfono: <strong> {store.profile.telephone} </strong></p>
                        <p className="m-2">País y código postal: <strong> {store.profile.country} - {store.profile.zip_code} </strong></p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                <div className="d-grid col-9 m-2 mt-4 background_form justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                    <h4 className="m-2 mt-3">Presentación</h4>
                    <p className="m-2 mb-4"><strong> {store.profile.description} </strong></p>
                </div>
                </div>
                <div className="d-flex justify-content-center">
                <div className="col-sx-9 col-sm-9 col-md-9 col-lg-9 col-xl-9  py-1 m-2 mt-3 background_form justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                    <h4 className="m-2 mt-3">Redes sociales:</h4>
                    <Link to="/add-socialnetwork" className="text-secondary text-end">
                        <p className="text-end m-1 me-5" ><i className="fa-solid fa-plus fa-xl"></i></p>
                    </Link>
                    {!store.socialNetworks ? 
                    <p>Cargando datos.. </p>
                    :
                    store.socialNetworks.map((item, id)=>{
                        return (
                            <div key={id} className="m-4 text-start d-flex justify-content-between col-sx-11 col-sm-11 col-md-11 col-lg-11 col-xl-11" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                                <div className="ms-4 mt-2">
                                <h4 className="col-sx-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 m-1 ps-3">{item.social_network}</h4>
                                <ul >
                                    <li className="list-group-item">Cantidad de seguidores: {item.followers}</li>
                                    <li className="list-group-item">Url o nickname:  
                                    <a href={`https://${item.social_network_url}`} target="_blank" className="text-dark ms-1" rel="noopener noreferrer">{item.social_network_url}</a></li>
                                </ul>
                                </div>
                                <div className="me-4 mt-2">
                                <Link to={`/update-socialnetwork/${item.id}`} onClick={() => actions.handleCurrentSocialNetwork(item)} className="bg-secondary mt-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar red social">
                                    <p className="text-end m-1 me-3"><i className="fa-regular fa-pen-to-square fa-xl text-secondary"></i></p>
                                </Link>
                                <button type="button" className="mt-2 border-0" aria-label="Close" onClick={() => handleDeleteSocialNetwork(item.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar red social" style={{background: "#FFFEF8"}}>
                                    <p className="text-end m-1 me-3"><i className="fa-solid fa-xmark fa-xl text-secondary"></i></p>
                                </button>
                                </div>
                            </div>
                    )
                    })}
                </div>       
                </div>
                <button href="#" className="btn btn-danger m-3" onClick={handleOnClick}>Cerrar sesión</button>
    
                </div>
                } 
            </div>
            : 
            <div className="text-center">
                { !store.user || !store.profile ? 
                <Spinner />
                :
                <div>
                <h2 className="text-center title-style"></h2>
                <Link to="/update-profile" className="text-secondary">
                    <p className="text-end m-1 me-5"><i className="fa-regular fa-pen-to-square fa-xl"></i></p>
                </Link>
                <div className="container-fluid d-flex mt-3 justify-content-center">
                    <div className="col-3 me-3">
                        <img src={store.profile.profile_img ? store.profile.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} 
                        style={{objectFit: "cover", aspectRatio: "1/1", width: "100%", border: "solid", borderWidth: "4px", borderColor: "#FFC66B"}} className="avatar-img rounded-circle" alt="Profile Image"/>                   
                        <h3 className="m-2"><strong>{store.profile.headline}</strong></h3>
                    </div>
                    <div className="col-sx-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-grid background_form justify-content-start text-start ps-5 ms-1" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                        <h4 className="m-2 mt-3"><strong>Datos</strong></h4>
                        <p className="m-2">Nombre: <strong> {store.profile.name} </strong></p>
                        <p className="m-2">Email: <strong> {store.user.email} </strong></p>
                        <p className="m-2">CIF: <strong> {store.profile.cif} </strong></p>
                        <p className="m-2">Industria: <strong> {store.profile.industry} </strong></p>
                        <p className="m-2">Página web: <strong><a href={`https://${store.profile.website}`} target="_blank" className="text-dark ms-1" rel="noopener noreferrer">{store.profile.website}</a></strong></p>
                        <p className="m-2">Teléfono: <strong> {store.profile.telephone} </strong></p>
                        <p className="m-2">País y código postal: <strong> {store.profile.country} - {store.profile.zip_code} </strong></p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                <div className="d-grid col-sx-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 m-2 mt-4 background_form justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                    <h4 className="m-2 mt-3">Descripción</h4>
                    <p className="m-2"><strong> {store.profile.description} </strong></p>
                </div>
                </div>
                <div className="d-flex justify-content-center">
                <div className="d-block col-sx-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 py-1 m-2 mt-3 background_form justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                    <h4 className="m-2 mt-3">Ofertas publicadas</h4>
                    <div className="d-flex justify-content-end me-2">
                        <Link to="/create-offer" className="text-secondary text-end">
                            <p className="text-end m-2 me-5"><i className="fa-solid fa-plus fa-xl"></i></p>
                        </Link>
                    </div>
                    {!store.offersCompany ? 
                    <Spinner />
                    : 
                    store.offersCompany.map((item, id) =>{
                        return(
                        <div className="m-2 text-start d-flex justify-content-between" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                            <div className="ms-4 mt-2 mb-2">
                                <h4 className="m-1 ps-3">{item.title}</h4>
                                <p className="m-1 ps-3">{item.post}</p>
                            </div>
                            <div className="me-4 mt-2">
                                <Link to={`/update-offer/${item.id}`} onClick={() => actions.handleCurrentOffer(item)} className="bg-secondary text-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar oferta">
                                    <p className="text-end m-1 me-3"><i className="fa-regular fa-pen-to-square fa-xl"></i></p>
                                </Link>
                            </div>
                        </div>
                    )})
                    }
                </div>
                </div>
                <button href="#" className="btn btn-danger m-3" onClick={handleOnClick}>Cerrar sesión</button>
                </div>
                }
            </div>
            }       
        </div>
    )
}