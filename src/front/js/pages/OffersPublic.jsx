import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import { NavbarOffers } from "../component/NavbarOffers.jsx";
import { NavbarFiltros } from "../component/NavbarFiltros.jsx";


export const OffersPublic = () => {
    const { store, actions } = useContext(Context);
    const data = store.offersPublic
    console.log(data)


    return (
            
        <div>
            <NavbarOffers/>
            
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-2">
                        <NavbarFiltros/>
                    </div>
                    <div className="col-10">
                        <div className="container-fluid">
                            <div className="card text-center">
                            <div className="card-header">Nombre de la empresa</div>
                            <div className="card-body">
                                <h5 className="card-title">Titulo de la Oferta</h5>
                                <p className="card-text">
                                Descripcion de la oferta.
                                </p>
                                <a href="#" className="btn btn-primary">
                                Resgistrarme
                                </a>
                            </div>
                            <div className="card-footer text-body-secondary">Dias del post
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
