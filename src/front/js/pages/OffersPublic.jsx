import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { NavbarFiltros } from "../component/NavbarFiltros.jsx";
import {Spinner} from "../component/Spinner.jsx"

export const OffersPublic = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate
    const [search, setSearch ] = useState("");

    const searcher = (e) => {
        setSearch(e.target.value)
    }
    
    const results = !search ? store.offersPublic : store.offersPublic.filter((dato) => dato.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        
    
    return (!store.offersPublic ? <Spinner/> : 
        <div>
            <div className="container-fluid col-4 ms-4 mt-3">
                <nav className="navbar ">
                    <div className="container-fluid col-10">
                        <form className="d-flex" role="search">
                            <input value={search} onChange={searcher} type="text" placeholder="Search" className="form-control me-2" aria-label="Search"/>
                        </form> 
                    </div>
                </nav>
            </div>
            {results.map((item, id) => (
                <div key= {id} className="container-fluid mt-4" >
                    <div className="row">
                        <div className="col-sm-2 col-md-3"></div>
                        <div className="col-sm-9 col-md-8">
                            <div className="container-fluid" >
                                <div className="card mb-3" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                                    <div className="row g-0">
                                        <div className="col-md-1 m-5">
                                        <img src={item.company.profile_img ? item.company.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="img-fluid rounded-circle" style={{objectFit: "cover", aspectRatio: "1/1"}}/>
                                        </div>
                                        <div className="col-md-8 mt-4">
                                            <div className="card-body">
                                                <h2 className="card-title">{item.title}</h2>
                                                <h5 className="card-title">{item.company.name}</h5>
                                                <small className="card-subtitle mb-2 mt-1 text-body-secondary">{ item.location} | {new Date(item.date_post).toLocaleDateString()}</small>
                                                <span><hr className="dropdown-divider mt-2"></hr></span>
                                                <p className="card-text mt-3">{item.post}</p>
                                                <p className="card-text">
                                                <small className="text-body-secondary">{(item.salary_range).toLocaleString()}$ | {(item.min_followers).toLocaleString()} Seguidores | {item.duration} Semanas</small>
                                                </p>
                                                <Link onClick={() => actions.handleOfferPublic(item)} to={`/oneOffer`} className="btn btn-primary my-2">Oferta</Link>
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