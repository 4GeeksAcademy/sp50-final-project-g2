import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useParams } from "react-router-dom";
import {Spinner} from "../component/Spinner.jsx"

export const Offer = () => {
    const { store, actions } = useContext(Context);
 


    return (!store.isLoggedIn ? <Navigate to='/signup' /> :
        <div>
            {!store.oneOffer ? <Spinner/> :   
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-11 col-md-10">
                        <div className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-1 m-5">
                                <img src= {store.oneOffer.company.profile_img ? store.oneOffer.company.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8 mt-4">
                                    <div className="card-body">
                                        <h2 className="card-title">{store.oneOffer.title}</h2>
                                        <Link to={`/oneOffer/company/${store.oneOffer.company.id_user}`}><h5 className="card-title ms-1">{store.oneOffer.company.name}</h5></Link>
                                        <div className="row">
                                            <div className="col-4 mt-2">
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                    <ul>
                                                        <li> Ubicacion: {store.oneOffer.location}</li>
                                                        <li> Duracion: {store.oneOffer.duration} Semanas</li>
                                                        <li> Publicada el {new Date(store.oneOffer.date_post).toLocaleDateString()} </li>
                                                    </ul>
                                                </small>
                                            </div>
                                            <div className="col-4 mt-2">
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                    <ul>
                                                        <li>Seguidores: {(store.oneOffer.min_followers).toLocaleString()}</li>
                                                        <li>Salario: {(store.oneOffer.salary_range).toLocaleString()} $</li>
                                                    </ul>
                                                </small>
                                            </div>
                                            <div className="col-4">
                                                <Link to="/register">
                                               <button className="btn btn-warning "> Inscribirme en esta oferta</button>
                                               </Link>
                                            </div>
                                        </div>
                                        <p className="card-text"></p>
                                        <p className="card-text">
                                        <small className="text-body-secondary"></small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  
                <div className="row">
                    <div className="col-sm-11 col-md-7">
                        <div className="card mb-3" >
                                <div className="col-md-12">
                                    <div className="card-body">
                                        <h4 className="card-title ms-5 mt-2">Descripcion:</h4>
                                        <p className="card-title mx-5 my-3">{store.oneOffer.post}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            }
        </div>              
    )
}