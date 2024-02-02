import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useParams } from "react-router-dom";
import {Spinner} from "../component/Spinner.jsx"

export const Offer = () => {
    const { store, actions } = useContext(Context);
    const { title, setTitle } = useState(store.oneOffer.title);
    const { companyName, setCompanyName } = useState(store.oneOffer.company);
    const { salary, setSalary } = useState(store.oneOffer.salary_range);
    const { post, setPost } = useState(store.oneOffer.post);
    const { followers, setFollowes } = useState(store.oneOffer.min_followers);
    const { weeks, setWeeks } = useState(store.oneOffer.duration);
    const { location, setLocation } = useState(store.oneOffer.location);
    const { date, setDate } = useState(new Date(store.oneOffer.date_post).toLocaleDateString());
    const { image, setImage } = useState(store.oneOffer.profile_img);
    const params = useParams()

    useEffect( () => {
        actions.getOneOffer(params.offerId);
    },[]) 

    return ( 
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-11 col-md-10">
                        <div className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-1 m-5">
                                <img src= "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2 className="card-title">{store.oneOffer.title}</h2>
                                        <h5 className="card-title"></h5>
                                        <div className="row">
                                            <div className="col-6">
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                    <ul>
                                                        <li></li>
                                                        <li> Publicada el {date} </li>
                                                        <li></li>
                                                    </ul>
                                                </small>
                                            </div>
                                            <div className="col-6">
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                    <ul>
                                                        <li> Seguidores</li>
                                                        <li>Salario: $</li>
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
                                        <h5 className="card-title"></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>              
            )
        }