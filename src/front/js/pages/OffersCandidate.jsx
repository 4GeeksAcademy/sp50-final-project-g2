import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const OffersCandidate = () => {
    const { store, actions } = useContext(Context);


    const handleStatus = (status) =>{
        if (status == "pending") return "Pendiente";
        else if (status == "accepted") return "Aceptado";
        else return "Rechazado"
    }

    const handleCancelOffer = async (id) => {
        const isConfirmed = window.confirm('¿Seguro que quiere cerrar la oferta?')
        if (isConfirmed) {
            await actions.cancelOffer(id)
            actions.getOfferByCandidates(store.profile.id)
            
        }
    }

    return (!store.registerCandidates ? <Spinner /> :
        <div>
            <h1 className="text-center mt-5 title-style"> Ofertas Inscritas</h1>
                {store.registerCandidates.map((item, id) => {
                    if (`${item.status_influencer}` == 'active') {
                    return (
                        <div key={id} className="container-fluid mt-5 mb-5">
                            <div  className="container-fluid" >
                                <div className="row">
                                    <div className="col-sm-1 col-md-2"></div>
                                    <div className="col-sm-9 col-md-8">
                                        <div className="card xs-mb-3 mt-3" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                                            <div className="row g-0">
                                                <div className="d-none d-lg-block col-sx-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 m-5">
                                                    <img src={item.company.profile_img ? item.company.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="img-fluid avatar-img rounded-circle" style={{objectFit: "cover", aspectRatio: "1/1", maxHeight: "100%", maxWidth: "100%"}} />
                                                </div>
                                                <div className="col-sx-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-4">
                                                    <div className="card-body">
                                                        <h2 className="card-title">{item.offer.title}</h2>
                                                        <Link to={`/offer-candidates/company/${item.company.id_user}`} style={{textDecoration: "none"}} className="text-secondary"><h5 className="card-title">{item.company.name}</h5></Link>
                                                        <small className="card-subtitle mb-2 mt-1 text-body-secondary"></small>
                                                        <span><hr className="dropdown-divider mt-2"></hr></span>
                                                        <p className="card-text mt-3"></p>
                                                        <small className="card-subtitle mb-2 mt-1 text-body-secondary">Posteado - {new Date(item.offer.date_post).toLocaleDateString()}</small>
                                                        <p className="card-text">
                                                            <small className="card-subtitle mb-2 mt-1 text-body-secondary">
                                                                Estado - {handleStatus(item.status_candidate)}
                                                            </small>
                                                        </p>
                                                        <button onClick={() => handleCancelOffer(item.id_offer)} type="button" className="btn btn-primary my-2"  >Cancelar Inscripcion</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                })
            }
          
        </div>
    )
}