import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const data = store.user;
    console.log(data);
    console.log(store.profile);


    const handleOnClick= () => actions.logout();

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center">MI PERFIL</h1>
            { store.isInfluencer == "true" ? 
            <div className="text-center">
                { !store.user || !store.profile ? 
                <Spinner />
                :
                <div>
                <h2>Influencer</h2>
                <Link to="/update-profile">
                    <p className="text-end m-1 me-3"><i className="fa-regular fa-pen-to-square fa-lg"></i></p>
                </Link>
                <div className="container-fluid d-flex mt-3">
                    <div className="col-4">
                        <img src={store.profile.profile_img ? store.profile.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="avatar-img rounded-circle border border-white border-3 img-fluid"></img>
                        <h3 className="m-2">{store.profile.headline}</h3>
                        <h4 className="m-2">Principal red social: <strong> {store.profile.social_networks} </strong></h4>
                    </div>
                    <div className="col-8 d-grid background_form rounded justify-content-center">
                        <h4 className="m-2">Datos personales</h4>
                        <p className="m-2">Nombre: <strong> {store.profile.first_name} </strong></p>
                        <p className="m-2">Apellido/s: <strong> {store.profile.last_name} </strong></p>
                        <p className="m-2">Email: <strong> {store.user.email} </strong></p>
                        <p className="m-2">Fecha de nacimiento: <strong> {store.profile.date_birth} </strong></p>
                        <p className="m-2">Género: <strong> {store.profile.gender} </strong></p>
                        <p className="m-2">Teléfono: <strong> {store.profile.telephone} </strong></p>
                        <p className="m-2">País y código postal: <strong> {store.profile.country} - {store.profile.zip_code} </strong></p>
                    </div>
                </div>
                <div className="d-grid m-2 mt-3 background_form rounded justify-content-center">
                    <h4 className="m-2">Descripción</h4>
                    <p className="m-2"><strong> {store.profile.description} </strong></p>
                </div>
                <div className="d-grid m-2 mt-3 background_form rounded justify-content-center">
                    <h4 className="m-2">Redes sociales:</h4>
                    <ul className="m-2 border rounded">
                        <li>Red social: <strong> Instagram </strong></li>
                        <li>Url o nickname: <strong> merlidowgaluk </strong></li>
                        <li>Cantidad de seguidores: <strong> 1.500 </strong></li>
                    </ul>
                    <ul className="m-2 border rounded">
                        <li>Red social: <strong> Facebook </strong></li>
                        <li>Url o nickname: <strong> merlidowgaluk </strong></li>
                        <li>Cantidad de seguidores: <strong> 100 </strong></li>
                    </ul>
                </div>
                <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
    
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
                <Link to="/update-profile">
                    <p className="text-end m-1 me-3"><i className="fa-regular fa-pen-to-square fa-lg"></i></p>
                </Link>
                <div className="container-fluid d-flex mt-3">
                    <div className="col-4">
                        <img src={store.profile.profile_img ? store.profile.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="avatar-img rounded-circle border border-white border-3 img-fluid"></img>
                        <h3 className="m-2">{store.profile.headline}</h3>
                    </div>
                    <div className="col-8 d-grid background_form rounded justify-content-center">
                        <h4 className="m-2">Datos </h4>
                        <p className="m-2">Nombre: <strong> {store.profile.name} </strong></p>
                        <p className="m-2">Email: <strong> {store.user.email} </strong></p>
                        <p className="m-2">CIF: <strong> {store.profile.cif} </strong></p>
                        <p className="m-2">Industria: <strong> {store.profile.industry} </strong></p>
                        <p className="m-2">Página web: <strong> {store.profile.website} </strong></p>
                        <p className="m-2">Teléfono: <strong> {store.profile.telephone} </strong></p>
                        <p className="m-2">País y código postal: <strong> {store.profile.country} - {store.profile.zip_code} </strong></p>
                    </div>
                </div>
                <div className="d-grid m-2 mt-3 background_form rounded justify-content-center">
                    <h4 className="m-2">Descripción</h4>
                    <p className="m-2"><strong> {store.profile.description} </strong></p>
                </div>
                <div className="d-grid m-2 mt-3 background_form rounded justify-content-start text-start">
                    <h4 className="m-2">Ofertas publicadas:</h4>
                    <ul className="m-2 border rounded">
                        <li>Título: <strong> Instagram </strong></li>
                        <li>Fecha de publicación: <strong> 05/01/2024 </strong></li>
                        <li>Descripción de la oferta: <strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus scelerisque nisl, nec malesuada purus efficitur sit amet. In eget aliquet nulla. Vestibulum eget lacinia elit. Nunc vitae ante vulputate, convallis tortor non, pretium orci. Nunc viverra mattis augue at auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras cursus viverra metus, a vestibulum ligula lobortis non. Maecenas vel mollis odio. Etiam eget elit tincidunt, blandit erat vitae, tempus nunc. Duis consectetur libero erat, consequat porttitor mauris hendrerit vel. Nullam pellentesque euismod lorem. Aliquam lectus magna, aliquet vel vulputate sed, posuere non enim. </strong></li>
                        <li>Estatus de la oferta: <strong> Activa </strong></li>
                        <li>Más detalle...</li>
                    </ul>
                    <ul className="m-2 border rounded">
                    <li>Título: <strong> Instagram </strong></li>
                        <li>Fecha de publicación: <strong> 05/01/2024 </strong></li>
                        <li>Descripción de la oferta: <strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus scelerisque nisl, nec malesuada purus efficitur sit amet. In eget aliquet nulla. Vestibulum eget lacinia elit. Nunc vitae ante vulputate, convallis tortor non, pretium orci. Nunc viverra mattis augue at auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras cursus viverra metus, a vestibulum ligula lobortis non. Maecenas vel mollis odio. Etiam eget elit tincidunt, blandit erat vitae, tempus nunc. Duis consectetur libero erat, consequat porttitor mauris hendrerit vel. Nullam pellentesque euismod lorem. Aliquam lectus magna, aliquet vel vulputate sed, posuere non enim. </strong></li>
                        <li>Estatus de la oferta: <strong> Activa </strong></li>
                        <li>Más detalle...</li>
                    </ul>
                </div>
                <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
                </div>
                }
            </div>
            }       
        </div>
    )
}