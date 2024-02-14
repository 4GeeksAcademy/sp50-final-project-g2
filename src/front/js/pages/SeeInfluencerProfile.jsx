import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const SeeInfluencerProfile = () => {
    const { store, actions } = useContext(Context); 
    const {influencer_id} = useParams()
    console.log("Influencer ID:", influencer_id);

    useEffect(()=>{
        actions.getInfluencerProfile(influencer_id),
        actions.seeSocialNetwork(influencer_id)
    },[influencer_id])
    

    return (
        <div>
            <h1 className="text-center mt-4 mb-5 title-style">Perfil</h1>
                <div className="container-fluid d-flex mt-3 justify-content-center">
                    <div className="col-3 me-3">
                        <img src= {store.profileInfluencer.profile_img ? store.profileInfluencer.profile_img :"https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} 
                        style={{objectFit: "cover", aspectRatio: "1/1", width: "100%", border: "solid", borderWidth: "4px", borderColor: "#FFC66B"}} className="avatar-img rounded-circle" alt="Profile Image"></img>
                        <h3 className="m-2 text-center"><strong>{store.profileInfluencer.headline}</strong></h3>
                    </div>
                    <div className="col-6 d-grid background_form justify-content-start text-start ps-5 ms-1" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", background: "#FFFEF8"}}>
                        <h4 className="m-2"><strong>Datos</strong></h4>
                        <p className="m-2">Nombre: <strong> {store.profileInfluencer.first_name} </strong></p>
                        <p className="m-2">Apellido/s: <strong> {store.profileInfluencer.last_name} </strong></p>
                        <p className="m-2">Fecha de nacimiento: <strong> {new Date(store.profileInfluencer.date_birth).toLocaleDateString()} </strong></p>
                        <p className="m-2">Género: <strong> {store.profileInfluencer.gender} </strong></p>
                        <p className="m-2">Teléfono: <strong> {store.profileInfluencer.telephone} </strong></p>
                        <p className="m-2">País y código postal: <strong> {store.profileInfluencer.country} - {store.profileInfluencer.zip_code} </strong></p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                <div className="d-block col-9 me-5 ms-5 mb-3 mt-3 background_form justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", background: "#FFFEF8"}}>
                    <h4 className="mt-2 text-center">Presentación</h4>
                    <p className="m-2 text-center"><strong> {store.profileInfluencer.description} </strong></p>
                </div>  
                </div>
                <div className="d-flex justify-content-center">
                <div className="d-block col-9 me-5 ms-5 mb-3 mt-3 background_form justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", background: "#FFFEF8"}}>
                    <h4 className="mt-2 text-center">Redes sociales</h4>
                    {!store.seeSocialNetworkForCompany ? 
                    <p>Cargando datos.. </p>
                    :
                    store.seeSocialNetworkForCompany.map((item, id)=>{
                        return (
                            <div key={id} className=" m-4 text-start d-flex justify-content-between" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                                <div className="ms-4 mt-2">
                                <h4 className="m-1 ps-3">{item.social_network}</h4>
                                <ul>
                                    <li className="list-group-item">Cantidad de seguidores: {item.followers}</li>
                                    <li className="list-group-item">Url o nickname:  
                                    <a href={`https://${item.social_network_url}`} target="_blank" className="text-dark ms-1" rel="noopener noreferrer">{item.social_network_url}</a></li>
                                </ul>
                                </div>
                            </div>
                    )
                    })}
                </div>  
                </div>          
                </div>
    )
}