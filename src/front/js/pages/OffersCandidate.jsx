import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const OffersCandidate = () => {
    const { store, actions } = useContext(Context);


    return (
        <div>  
            <h1 className="text-center mt-5 "> Ofertas Inscritas</h1>
            <div className="container-fluid mt-5">
           {!store.registerCandidates ? 
                    <Spinner/>
                    :
                    store.registerCandidates.map((item, id)=>{
                        return ( 
                            <div key={id} className="container-fluid" >
                                <div className="row">
                                    
                                        <div className="col-sm-1 col-md-2">    
                                        </div>
                                    <div className="col-sm-9 col-md-8">
                                        <div className="card xs-mb-3 mt-3" >
                                            <div className="row g-0">
                                                <div className="col-md-1 m-5">
                                                <img src= {item.company.profile_img ? item.company.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="img-fluid rounded-start" />
                                                </div>
                                                <div className="col-md-8 mt-4">
                                                    <div className="card-body">
                                                        <h2 className="card-title">{item.offer.title}</h2>
                                                        <h5 className="card-title">{item.company.name}</h5>
                                                        <small className="card-subtitle mb-2 mt-1 text-body-secondary"></small>
                                                        <span><hr className="dropdown-divider mt-2"></hr></span>
                                                        <p className="card-text mt-3"></p>
                                                        <small className="card-subtitle mb-2 mt-1 text-body-secondary">Posteado - {new Date(item.offer.date_post).toLocaleDateString()}</small>
                                                        <p className="card-text">
                                                        <small className="card-subtitle mb-2 mt-1 text-body-secondary">Estado - {item.status_candidate}</small>
                                                        </p>
                                                        <button type="button" className="btn btn-primary my-2" aria-label="Close" >Cancelar Inscripcion</button>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                     )
                    })} 
                </div>
        </div>
    )
}