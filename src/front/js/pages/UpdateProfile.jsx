import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
    const { store, actions } = useContext(Context);
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ headline, setHeadline ] = useState();
    const [ socialNetwork, setSocialNetwork] = useState();
    const [ dateBirth, setDateBirth ] = useState();
    const [ gender, setGender ] = useState();
    const [ telephone, setTelephone ] = useState();
    const [ country, setCountry ] = useState();
    const [ zip, setZip ] = useState();
    const [ description, setDescription ] = useState();



    const handleOnSubmit = (event) => {
        event.preventDefault();

        
    }

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center">EDITAR MI PERFIL</h1>
            { store.isInfluencer ? 
            <div className="text-center">
                { !store.user || !store.profile ? 
                <p>Cargando datos...</p>
                :
                <div>
                <h2>Influencer</h2>
                <div className="d-flex justify-content-center">
                    <div className="m-5 col-5 background_form p-2 rounded">
                        <div className="mb-3 text-start">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={firstName} onChange={(e) => setFirstName(e.target.value)} ></input>
  			            </div>
                        <div className="mb-3 text-start">
    			            <label htmlFor="exampleInputLastName" className="form-label">Apellido</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={lastName} onChange={(e) => setLastName(e.target.value)} ></input>
  			            </div>
                        <div className="mb-3 text-start">
    			            <label htmlFor="exampleInputHeadline" className="form-label">Headline</label>
    			            <input type="text" className="form-control" id="exampleInputHeadline" aria-describedby="emailHelp"
				            value={headline} onChange={(e) => setHeadline(e.target.value)} ></input>
  			            </div>
                        <button type="submit" className="btn btn-success btn-lg" onClick={handleOnSubmit}>Submit</button>
                        <Link to="/profile">
                            <p className="text-end m-1 me-3">O vuelve al perfil.</p>
                        </Link>
                    </div>
                </div>
                </div>
                }
            </div>
        :
            <div className="text-center">
                <h2>Empresa</h2>
            </div>
        }
        </div>
    )
}