import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const SeeInfluencerProfile = () => {
    const { store, actions } = useContext(Context); 
    const {influencer_id} = useParams()
    console.log("Influencer ID:", influencer_id);

    useEffect(()=>{
        actions.getInfluencerProfile(influencer_id)
    },[])
    

    return (
        <div>
            <h2>Influencer</h2>
                <div className="container-fluid d-flex mt-3 justify-content-center">
                    <div className="col-3 me-2">
                        <img src= {store.profileInfluencer.profile_img ? store.profileInfluencer.profile_img :"https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" } 
                        className="avatar-img rounded-circle border border-white border-3 img-fluid"></img>
                        <h3 className="m-2">{store.profileInfluencer.headline}</h3>
                    </div>
                    <div className="col-8 d-grid background_form rounded justify-content-center">
                        <h4 className="m-2">Datos </h4>
                        <p className="m-2">Nombre: <strong> {store.profileInfluencer.first_name} </strong></p>
                        <p className="m-2">Apellido/s: <strong> {store.profileInfluencer.last_name} </strong></p>
                        <p className="m-2">Fecha de nacimiento: <strong> {store.profileInfluencer.date_birth} </strong></p>
                        <p className="m-2">Género: <strong> {store.profileInfluencer.gender} </strong></p>
                        <p className="m-2">Teléfono: <strong> {store.profileInfluencer.telephone} </strong></p>
                        <p className="m-2">País y código postal: <strong> {store.profileInfluencer.country} - {store.profileInfluencer.zip_code} </strong></p>
                    </div>
                </div>
                <div className="d-grid m-2 mt-3 background_form rounded justify-content-center">
                    <h4 className="m-2">Descripción</h4>
                    <p className="m-2"><strong> {store.profileInfluencer.description} </strong></p>
                </div>              
                </div>
    )
}