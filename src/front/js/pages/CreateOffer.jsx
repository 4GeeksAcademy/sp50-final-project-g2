import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const CreateOffer = () =>{
    const { store, actions } = useContext(Context);
    const [ title, setTitle] = useState("");
    const [ post, setPost ] = useState("");
    // status -> se tiene que dejar por defecto en routes como "opened", luego la empresa puede cambiar el estado
    const [ salaryRange, setSalaryRange ] = useState("");
    const [ minFollowers, setMinFollowers ] = useState("");
    const [ industry, setIndustry ] = useState("");
    const [ duration, setDuration ] = useState("");
    const [ location, setLocation ] = useState("");

    const handleOnSubmit = () =>{
        const post = {
            
        }

    }

    return(
        store.isInfluencer == "true" ? <Navigate to='/profile' /> :
        <div>
            <div>
                <h1 className="text-center m-2">CREAR UNA OFERTA</h1>
                <div className="d-flex justify-content-center">
                    <div className="m-5 col-8 background_form p-2 rounded">
                        <form onSubmit={handleOnSubmit}>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Escribe tu nombre"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputLastName" className="form-label">Apellido</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="Escribe tu apellido"></input>
  			            </div>
                        </div>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputGender" className="form-label">Género</label>
    			            <input type="text" className="form-control" id="exampleInputGender" aria-describedby="emailHelp"
				            value={minFollowers} onChange={(e) => setMinFollowers(e.target.value)} placeholder="Escribe tu género"></input>
  			            </div>
                        </div>
                        <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Teléfono</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Escribe tu teléfono"></input>
  			            </div>
                          <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputCountry" className="form-label">País</label>
    			            <input type="text" className="form-control" id="exampleInputCountry" aria-describedby="emailHelp"
				            value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Escribe tu país de residencia"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputzip" className="form-label">Código postal</label>
    			            <input type="text" className="form-control" id="exampleInputzip" aria-describedby="emailHelp"
				            value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Escribe tu código postal"></input>
  			            </div>
                        </div>
                        <div className="mb-3 text-start mx-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={post} onChange={(e) => setPost(e.target.value)} placeholder="Escribe tu descripción..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                        </form>
                        <Link to="/profile">
                            <p className="text-end m-1 me-3">O vuelve al perfil.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}