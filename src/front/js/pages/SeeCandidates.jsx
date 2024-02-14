import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import { Spinner } from "../component/Spinner.jsx"
import { getCandidates } from "../store/flux.js"
import { Link, Navigate, useParams } from "react-router-dom"
import { refuseCandidate } from "../store/flux.js"

export const SeeCandidates = () => {
    const { store, actions } = useContext(Context)
    const { offer_id } = useParams()  
   
    useEffect(() => {
        actions.getCandidates(offer_id); // Llamada a la acción
    }, [offer_id]);
    
        
    
    const handleAcceptCandidate = async(influencer_id) =>{
        await actions.acceptCandidate(offer_id, influencer_id);
        actions.getCandidates(offer_id)
    }

    const handleRefuseCandidate = async (influencer_id) => {
        const isConfirmed = window.confirm('¿Seguro que quiere rechazar a este influencer?');
        if (isConfirmed) {
            await actions.refuseCandidate(offer_id, influencer_id);
            await actions.getCandidates(offer_id);
        }
    }

    return (store.isInfluencer ? <Navigate to="/" /> :
        !store.candidates ? <Spinner /> :
        
        <div className="container-fluid my-4">
            <div className="container">
                <h1 className="text-center title-style mt-4 mb-5">Candidatos</h1>
                {store.candidates.length == 0 ?
                <div className="row align-items-center">
                <div className="alert alert-primary m-5" role="alert">
                    No hay candidatos en esta oferta.
                </div>
                <Link to="/company/my-offers/all-candidates" className="text-secondary text-end m-2">Volver atrás.</Link>
                </div>
                :
                <div className="row">
                    {store.candidates.filter(item => item.status_candidate == 'pending').map((item,index) => (
                        <div key={index} className="card mb-3 p-0" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img
                                        src={item.influencer.profile_img}
                                        className="img-fluid rounded-circle my-3 ms-2" style={{objectFit: "cover", aspectRatio: "1/1", width: "100%"}}
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-8 position-relative my-2">
                                    <div className="card-body ">
                                        <h5 className="card-title">{item.influencer.first_name} {item.influencer.last_name}</h5>
                                        <p className="card-text">{item.cover_letter}</p>
                                    </div>
                                    <div className="mx-3 my-2 position-absolute bottom-0 start-0">
                                        <button className="btn btn-primary me-4" style={{ cursor: 'default', backgroundColor: "#325D88" }}>{item.followers.toLocaleString()} seguidores</button>
                                        <button className="btn btn-primary">
                                            <Link className="text-light" to={`/influencer/${item.influencer.id}/profile`} rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                                Perfil
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex align-items-start justify-content-end btn btn-group my-2">
                                    <button type="button" className="btn btn-outline-primary me-2" onClick={() => handleAcceptCandidate(item.influencer.id)}>Aceptar</button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => handleRefuseCandidate(item.influencer.id)}>Descartar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Link to="/company/my-offers" className="text-secondary text-end m-2">Volver atrás.</Link>
                </div>
                }
            </div>
        </div>
    )
}