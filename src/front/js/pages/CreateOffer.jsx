import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const CreateOffer = () =>{
    const { store, actions } = useContext(Context);
    const [ title, setTitle] = useState("");
    const [ post, setPost ] = useState("");
    const [ salaryRange, setSalaryRange ] = useState("");
    const [ minFollowers, setMinFollowers ] = useState("");
    const [ industry, setIndustry ] = useState("");
    const [ duration, setDuration ] = useState("");
    const [ location, setLocation ] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const postOffer = {
           title: title,
           post: post,
           salary_range: salaryRange,
           min_followers: minFollowers,
           industry: industry,
           duration_in_weeks: duration,
           location: location
        }
        handleOffer(postOffer);
        navigate('/profile')
    }

    const handleOffer = async(post) =>{
        const url = process.env.BACKEND_URL + "/api/offers";
        const options = {
            method: "POST",
            body: JSON.stringify(post),
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            },   
        };
        const response = await fetch(url, options);
        if (!response.ok){
            console.log(response.status, response.statusText);
            return
        }
        const data = await response.json();
        console.log(data);
        actions.handleOffersCompany()
    }

    return(
        store.isInfluencer == true ? <Navigate to='/profile' /> :
        <div>
            <div>
                <h1 className="text-center m-2 title-style">CREAR UNA OFERTA</h1>
                <div className="d-flex justify-content-center">
                    <div className="m-5 col-8 background_form p-2 rounded" style={{background: "#FFC66B"}}>
                        <form onSubmit={handleOnSubmit}>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-12 mx-2">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Título</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Escribe el título de la oferta"></input>
  			            </div>
                        </div>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputGender" className="form-label">Mínimo de seguidores</label>
    			            <input type="text" className="form-control" id="exampleInputGender" aria-describedby="emailHelp"
				            value={minFollowers} onChange={(e) => setMinFollowers(e.target.value)} placeholder="Requeridos para el postulante"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputLastName" className="form-label">Rango de salario</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="Rango de salario"></input>
  			            </div>
                        </div>
                        <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Industria/Área</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Relacionada con la oferta"></input>
  			            </div>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputCountry" className="form-label">Duración en semanas</label>
    			            <input type="text" className="form-control" id="exampleInputCountry" aria-describedby="emailHelp"
				            value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Escribe la duración del proyecto"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputzip" className="form-label">Ubicación</label>
    			            <input type="text" className="form-control" id="exampleInputzip" aria-describedby="emailHelp"
				            value={location} onChange={(e) => setLocation(e.target.value)} placeholder="País o ciudad de ubicación"></input>
  			            </div>
                        </div>
                        <div className="mb-3 text-start mx-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción de la oferta</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                            value={post} onChange={(e) => setPost(e.target.value)} placeholder="Escribe la descripción de la oferta..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg m-2">Submit</button>
                        </form>
                        <Link to="/profile" className="text-dark">
                            <p className="text-end m-1 me-3 text-dark">O vuelve al perfil.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}