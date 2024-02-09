import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const data = store.user;
    console.log(data);
    console.log(store.profile);
    

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center title-style">Perfil</h1>
            { store.isInfluencer == false ? 
            <div className="text-center">
                { !store.user || !store.profile ? 
                <Spinner />
                :
                <div>
                <h2 className="title-style">Influencer</h2>
                    <Link to="/update-profile">
                        <p className="text-end m-1 me-3"><i className="fa-regular fa-pen-to-square fa-lg"></i></p>
                    </Link>
                    <div className="container-fluid d-flex mt-3 justify-content-center">
                        <div className="col-3 me-2">
                            <img src={store.profile.profile_img ? store.profile.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="avatar-img rounded-circle border border-white border-3 img-fluid"></img>
                            <h3 className="m-2">{store.profile.headline}</h3>
                            <h4 className="m-2">Principal red social: <strong> {store.profile.social_networks} </strong></h4>
                        </div>
                        <div className="col-8 d-grid background_form rounded justify-content-center">
                            <h4 className="m-2">Datos personales</h4>
                            <p className="m-2">Nombre: <strong> {store.profile.first_name} </strong></p>
                            <p className="m-2">Apellido/s: <strong> {store.profile.last_name} </strong></p>
                            <p className="m-2">Email: <strong> {store.user.email} </strong></p>
                            <p className="m-2">Fecha de nacimiento: <strong> {(new Date(store.profile.date_birth)).toLocaleDateString()} </strong></p>
                            <p className="m-2">Género: <strong> {store.profile.gender} </strong></p>
                            <p className="m-2">Teléfono: <strong> {store.profile.telephone} </strong></p>
                            <p className="m-2">País y código postal: <strong> {store.profile.country} - {store.profile.zip_code} </strong></p>
                        </div>
                    </div>
                    <div className="d-grid m-2 mt-3 background_form rounded justify-content-center">
                        <h4 className="m-2">Descripción</h4>
                        <p className="m-2"><strong> {store.profile.description} </strong></p>
                    </div>
                    <div className="d-block py-1 m-2 mt-3 background_form rounded justify-content-center">
                        <h4 className="m-2">Redes sociales:</h4>
                        <Link to="/add-socialnetwork" className="text-secondary text-end">
                            <p className="text-end m-2"><i className="fa-solid fa-plus fa-lg"></i></p>
                        </Link>
                        {!store.socialNetworks ? 
                        <p>Cargando datos.. </p>
                        : <div>null</div>
                        }
                    </div>
                    <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
                </div>
                }
            </div>
            : null
            }
        </div>
    );
};