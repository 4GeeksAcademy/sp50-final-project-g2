import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useParams } from "react-router-dom";
import {Spinner} from "../component/Spinner.jsx"

export const Offer = () => {
    const { store, actions } = useContext(Context);

    const oneOffer = useParams();


    return ( !store.offersPublic ? <Spinner/> : 
        <div>
            {store.offersPublic.map((item) => (
            <div key={item.id} className="container mt-5">
                <div className="row">
                    <div className="col-sm-11 col-md-10">
                        <div className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-1 m-5">
                                <img src={item.profile_img ? item.profile.img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2 className="card-title">{item.title}</h2>
                                        <h5 className="card-title">{item.company.name}</h5>
                                        <div className="row">
                                            <div className="col-6">
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                    <ul>
                                                        <li>{item.location}</li>
                                                        <li> Publicada el {new Date(item.date_post).toLocaleDateString()}</li>
                                                        <li>{item.duration} Semanas</li>
                                                    </ul>
                                                </small>
                                            </div>
                                            <div className="col-6">
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                    <ul>
                                                        <li>{(item.min_followers).toLocaleString()} Seguidores</li>
                                                        <li>Salario: {item.salary_range}$</li>
                                                    </ul>
                                                </small>
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
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2 className="card-title">Descripcion:</h2>
                                        <h5 className="card-title">{item.post}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    ))
                }
            </div>              
            )
        }