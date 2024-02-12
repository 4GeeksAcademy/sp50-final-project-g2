import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";

export const BtnNotifications = () =>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleOneOffer = (id_offer) =>{
        actions.getOneOffer(id_offer);
       // navigate("/oneOffer")
    }

    return(
    store.isInfluencer == true ? 
    <div className="dropdown dropdown-menu-end">
        <button type="button" className="btn btn-warning m-2 color-button dropdown-toggle position-relative" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-regular fa-bell fa-lg pe-2"></i>
        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle">
            <span className="visually-hidden">New alerts</span>
        </span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1" >
            <li className="d-flex m-1"><span className="dropdown-item-text" style={{color: "black"}}>Candidaturas:</span></li>
            {!store.registerCandidates ? (
                <li><a className="dropdown-item" href="#">No tienes notificaciones.</a></li>
            ) : (
            store.registerCandidates.map((item, id)=>{
                if (`${item.status_candidate}` == "accepted" || `${item.status_candidate}` == "refused"){
                    return ( 
                    <li key={item.id} className="d-flex">
                        <Link onClick={() => actions.getOneOffer(item.id_offer)} to="/oneOffer" className="dropdown-item" style={{color: "black"}} >{item.offer.title}</Link>
                        <p className="dropdown-item border rounded me-1" style={{color: "black"}}>{item.status_candidate == "accepted" ? "Aceptado" : "Rechazado"}</p>
                    </li>
                )}
            }))}
            <li className="d-flex text-center btn btn-warning justify-content-center btn-sm m-1"><Link className="text-light" to="/offer-candidates" style={{color: "black"}}>Ver todas</Link></li> 
          </ul>
    </div>
    :
    <div className="dropdown dropdown-menu-end " >
        <button type="button" className="btn btn-warning m-2 color-button dropdown-toggle position-relative" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-regular fa-bell fa-lg pe-2"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {!store.candidatesOffersAll ? "0" : store.candidatesOffersAll.length}
            <span className="visually-hidden">New alerts</span>
        </span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1" >
            <li className="d-flex m-1"><span className="dropdown-item-text" style={{color: "black"}}> Candidatos:</span></li>
            {!store.candidatesOffersAll ? (
                <li><a className="dropdown-item" href="#" style={{color: "black"}}>No tienes candidatos en tus ofertas.</a></li>
            ) : (
            store.candidatesOffersAll.map((item, id)=>{
             return ( 
                <li key={item.id} className="d-flex">
                    <Link to={`/company/my-offers/${item.id_offer}/influencers/influencer/${item.id_influencer}/profile`} className="dropdown-item" style={{color: "black"}} >{item.influencer.first_name} {item.influencer.last_name}</Link>
                    <p className="dropdown-item border rounded me-1" style={{color: "black"}}>Seguidores: {item.followers}</p>
                </li>
                )
            }))}
            <li className="d-flex text-center btn btn-warning justify-content-center btn-sm m-1"><Link className="text-light" to="/company/my-offers/all-candidates" style={{color: "black"}}>Ver todos</Link></li> 
          </ul>
    </div>
    )
}