import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";
import { NavbarOffers } from "../component/NavbarOffers.jsx";
import { NavbarFiltros } from "../component/NavbarFiltros.jsx";
import {Spinner} from "../component/Spinner.jsx"

export const OffersPublic = () => {
    const { store, actions } = useContext(Context);



    return ( !store.offersPublic ? <Spinner/> : 
        <div>
            <NavbarOffers/>
            {store.offersPublic.map((item) => (
                <div key= {item.id} className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-sm-2 col-md-3">    
                        </div>
                        <div className="col-sm-9 col-md-8">
                            <div className="container-fluid">
                            <div className="card mb-3" >
                                <div className="row g-0">
                                    <div className="col-md-1 m-5">
                                    <img src={item.profile_img ? item.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h2 className="card-title">{item.title}</h2>
                                            <h5 className="card-title">{item.company.name}</h5>
                                            <small className="card-subtitle mb-2 mt-1 text-body-secondary">{ item.location} | {new Date(item.date_post).toLocaleDateString()}</small>
                                            <p><hr className="dropdown-divider" /></p>
                                            <p className="card-text">{item.post}</p>
                                            <p className="card-text">
                                            <small className="text-body-secondary">{item.salary_range}$ | {(item.min_followers).toLocaleString()} Seguidores | {item.duration} Semanas</small>
                                            </p>
                                            <Link onClick={() => actions.handleOfferPublic(item)} to={`/offers/${item.id}`} className="btn btn-primary">Oferta</Link>
                                        </div>
                                    </div>
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
