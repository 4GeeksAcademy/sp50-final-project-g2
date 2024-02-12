import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import { Spinner } from "../component/Spinner.jsx";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { closeOffer } from "../store/flux.js"


export const MyOffers = () => {
    const { store, actions } = useContext(Context)
    const { id_user_company } = useParams()
    const { offer_id } = useParams() 
    const { navigate } = useNavigate()

    const handleVerInscritos = (id_offer) =>{
        navigate(`/company/${id_user_company}/my-offers/${id_offer}/influencers`)
    }
    const handleCloseOffer = async(offer_id) =>{
        const isConfirmed = window.confirm('¿Seguro que quiere cerrar la oferta?')
        if (isConfirmed){
            await actions.closeOffer(offer_id)
            actions.handleOffersCompany(id_user_company)
        }
    }

    useEffect(() => {
        actions.handleOffersCompany(id_user_company);
    },[])
    
    return(!store.offersCompany ? <Spinner /> :
        <div className="container-fluid my-4">
            <div className="container">
                <h1 className="text-center title-style mt-4 mb-5">Mis ofertas</h1>
                <div className="row">
                    {store.offersCompany.filter(item => item.status != "closed").map((item,index) => (
                        <div className="d-flex justify-content-center">
                        <div key={index} className="card mb-3 p-0 col-8" style={{border: "solid", borderColor: "#FFC66B", backgroundColor: "#ffdfaf1",  borderRadius: "15px"}}>
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body ">
                                        <h4 className="card-title">Título: {item.title}</h4>
                                        <p className="card-text"> Descripción: {item.post}</p>
                                        <p>Estado de la oferta: {item.status == "opened" ? "Abierta" : "Cerrada/Cancelada"}</p>
                                    </div>
                                    <div className="mx-3 my-2">
                                        <Link to={`/company/my-offers/${item.id}/influencers`} className="btn btn-primary me-4"><i className="fa-regular fa-eye fa-lg me-2" style={{color: "white"}}></i>Ver inscritos</Link>
                                        <button type="button" className="btn btn-primary me-2" onClick={() => handleCloseOffer(item.id)}>Finalizar oferta</button>
                                    </div>
                                    <div className="col-md-2 d-flex align-items-start justify-content-end btn btn-group">
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}