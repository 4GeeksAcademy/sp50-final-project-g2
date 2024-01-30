import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import { UploadImage } from "../component/UploadImage.jsx";

export const UpdateProfile = () => {
    const { store, actions } = useContext(Context);
    // Datos influencer
    const [ firstName, setFirstName ] = useState(store.profile.first_name);
    const [ lastName, setLastName ] = useState(store.profile.last_name);
    const [ headline, setHeadline ] = useState(store.profile.headline);
    const [ socialNetwork, setSocialNetwork] = useState(store.profile.social_networks);
    const [ dateBirth, setDateBirth ] = useState(store.profile.date_birth);
    const [ gender, setGender ] = useState(store.profile.gender);
    const [ telephone, setTelephone ] = useState(store.profile.telephone);
    const [ country, setCountry ] = useState(store.profile.country);
    const [ zip, setZip ] = useState(store.profile.zip_code);
    const [ description, setDescription ] = useState(store.profile.description);
    // Datos empresa
    const [ name, setName ] = useState(store.profile.name);
    const [ cif, setCif ] = useState(store.profile.cif);
    const [ industry, setIndustry ] = useState(store.profile.industry);
    const [ website, setWebsite ] = useState(store.profile.website);


    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (store.isInfluencer == true){
            const profile = {
                first_name: firstName,
                last_name: lastName,
                date_birth: dateBirth,
                gender: gender,
                telephone: telephone,
                country: country,
                zip_code: zip,
                headline: headline,
                description: description,
                social_networks: socialNetwork
            }
            handleInfluencer(profile)
        } else {

        }
    }

    const handleInfluencer = async (profile) => {
        const url = process.env.BACKEND_URL + "/api/profile";
        const options = {
            method: "PUT",
            body: JSON.stringify({profile}),
            headers:{
                "Content-Type": "application/json"
            },   
        };
        const response = await fetch(url, options);
        if (!response.ok){
            console.log(response.status, response.statusText);
            return
        }
        const data = await response.json();
        console.log(data)
    }

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center">EDITAR MI PERFIL</h1>
            { store.isInfluencer == "true" ? 
            <div className="text-center">
                { !store.user || !store.profile ? 
                <Spinner />
                :
                <div>
                <h2>Influencer</h2>
                <div className="d-flex justify-content-center">
                    <div className="m-5 col-8 background_form p-2 rounded">
                        <UploadImage />
                        <form onSubmit={handleOnSubmit}>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={firstName ? firstName : ""} onChange={(e) => setFirstName(e.target.value)} placeholder="Escribe tu nombre"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputLastName" className="form-label">Apellido</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={lastName ? lastName : ""} onChange={(e) => setLastName(e.target.value)} placeholder="Escribe tu apellido"></input>
  			            </div>
                        </div>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputDate" className="form-label">Fecha de nacimiento</label>
    			            <input type="date" className="form-control" id="exampleInputDate" aria-describedby="emailHelp"
				            value={dateBirth} onChange={(e) => setDateBirth(e.target.value)} ></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputGender" className="form-label">Género</label>
    			            <input type="text" className="form-control" id="exampleInputGender" aria-describedby="emailHelp"
				            value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Escribe tu género"></input>
  			            </div>
                        </div>
                        <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Teléfono</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Escribe tu teléfono"></input>
  			            </div>
                          <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputCountry" className="form-label">País</label>
    			            <input type="text" className="form-control" id="exampleInputCountry" aria-describedby="emailHelp"
				            value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Escribe tu país de residencia"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputzip" className="form-label">Código postal</label>
    			            <input type="text" className="form-control" id="exampleInputzip" aria-describedby="emailHelp"
				            value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Escribe tu código postal"></input>
  			            </div>
                        </div>
                        <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Red social</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={socialNetwork} onChange={(e) => setSocialNetwork(e.target.value)} placeholder="Escribe tu red social más utilizada"></input>
  			            </div>
                        <div className="mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputHeadline" className="form-label">Headline</label>
    			            <input type="text" className="form-control" id="exampleInputHeadline" aria-describedby="emailHelp"
				            value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Escribe tu encabezado de perfil, lo que primero verán las empresas"></input>
  			            </div>
                        <div class="mb-3 text-start mx-2">
                            <label htmlFor="exampleFormControlTextarea1" class="form-label">Descripción</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Escribe tu descripción..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                        </form>
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
                { !store.user || !store.profile ?
                <Spinner />
                :
                <div>
                <h2>Empresa</h2>
                <div className="d-flex justify-content-center">
                    <div className="m-5 col-8 background_form p-2 rounded">
                        <form onSubmit={handleOnSubmit}>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
    			            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				            value={name} onChange={(e) => setName(e.target.value)} placeholder="Escribe el nombre de la empresa"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputLastName" className="form-label">CIF</label>
    			            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp"
				            value={cif} onChange={(e) => setCif(e.target.value)} placeholder="Escribe el CIF/NIF"></input>
  			            </div>
                        </div>
                        <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Teléfono</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Escribe un teléfono"></input>
  			            </div>
                        <div className="container d-flex justify-content-center">
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputCountry" className="form-label">País</label>
    			            <input type="text" className="form-control" id="exampleInputCountry" aria-describedby="emailHelp"
				            value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Escribe tu país de residencia"></input>
  			            </div>
                        <div className="mb-3 text-start col-6 mx-2">
    			            <label htmlFor="exampleInputzip" className="form-label">Código postal</label>
    			            <input type="text" className="form-control" id="exampleInputzip" aria-describedby="emailHelp"
				            value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Escribe tu código postal"></input>
  			            </div>
                        </div>
                        <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Industria</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Describe el área/industria de la empresa"></input>
  			            </div>
                          <div className="col-6 mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputTel" className="form-label">Página web</label>
    			            <input type="text" className="form-control" id="exampleInputTel" aria-describedby="emailHelp"
				            value={website} onChange={(e) => setWebsite(e.target.value)}></input>
  			            </div>
                        <div className="mb-3 text-start mx-2">
    			            <label htmlFor="exampleInputHeadline" className="form-label">Headline</label>
    			            <input type="text" className="form-control" id="exampleInputHeadline" aria-describedby="emailHelp"
				            value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Escribe el encabezado de perfil"></input>
  			            </div>
                        <div class="mb-3 text-start mx-2">
                            <label htmlFor="exampleFormControlTextarea1" class="form-label">Descripción</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Escribe tu descripción..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                        </form>
                        <Link to="/profile">
                            <p className="text-end m-1 me-3">O vuelve al perfil.</p>
                        </Link>
                    </div>
                </div>
                </div>
                }
            </div>
        }
        </div>
    )
}