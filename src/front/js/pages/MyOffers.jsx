import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import { Spinner } from "../component/Spinner.jsx"
import { useParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getMyOffers } from "../store/flux.js";
import { deleteOffer } from "../store/flux.js"

export const MyOffers = () => {
    const { store, actions } = useContext(Context)
    const { id_user_company } = useParams()
    const { offer_id } = useParams() 
    const { navigate } = useNavigate()

    const handleDeleteOffer = async (id_offer) => {
        try {
            const isConfirmed = window.confirm('¿Seguro que quiere eliminar la oferta?');
            if (isConfirmed) {
                await actions.deleteOffer(id_user_company, id_offer);
                actions.getMyOffers(id_user_company);
            }
        } catch (error) {
            console.error(error.message);
            // Puedes mostrar un mensaje de error al usuario aquí.
        }
    };

    const handleVerInscritos = (id_offer) =>{
        navigate(`/company/${id_user_company}/my-offers/${id_offer}/influencers`)
    }

    useEffect(() => {
        actions.handleOffersCompany(id_user_company);
    },[])
    
    return(!store.myOffers ? <Spinner /> :
        <div className="container-fluid my-4">
            <div className="container">
                <h1 className="text-center">Mis ofertas</h1>
                <div className="row">
                    {store.myOffers.map((item,index) => (
                        <div key={index} className="card mb-3 p-0">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img
                                        src='...'
                                        className="img-thumbnail rounded-start border-0" style={{ maxHeight: "100%" }}
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body ">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.post}</p>
                                        {/* <button className="btn btn-primary">{item.followers} seguidores</button> */}
                                    </div>
                                    <div className="mx-3 my-2">
                                    <Link to={`/company/${id_user_company}/my-offers/${item.id}/influencers`} className="btn btn-primary me-4">Ver inscritos</Link>
                                </div>
                                </div>
                                <div className="col-md-2 d-flex align-items-start justify-content-end btn btn-group">
                                    <button type="button" className="btn btn-outline-primary me-2" onClick={() => handleDeleteOffer(item.id)}>Finalizar oferta</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>










    )
}