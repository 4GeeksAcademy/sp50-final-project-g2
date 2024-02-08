import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const ProfileCompany = () => {
    const { store, actions } = useContext(Context)
    const { id_company } = useParams()

    useEffect(() => {
        actions.getProfileCompany(id_company)
    }, [])


    return (
        <div>
            <h2 className="text-center my-4">Empresa</h2>
            <div className="container-fluid d-flex mt-3 justify-content-center">
                <div className="col-3 me-2">
                    <img src={store.profileCompany.profile_img ? store.profileCompany.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} className="avatar-img rounded-circle border border-white border-3 img-fluid"></img>
                    <h3 className="m-2"></h3>
                </div>
                <div className="col-8 d-grid background_form rounded justify-content-center">
                    <h4 className="m-2">Datos </h4>
                    <p className="m-2">Nombre:<strong>{store.profileCompany.name}</strong></p>
                    <p className="m-2">CIF: <strong>{store.profileCompany.cif}</strong></p>
                    <p className="m-2">Industria: <strong>{store.profileCompany.industry}</strong></p>
                    <p className="m-2">Página web: <strong>{store.profileCompany.website}</strong></p>
                    <p className="m-2">País y código postal: <strong>{store.profileCompany.country} - {store.profileCompany.zip_code} </strong></p>
                </div>
            </div>
            <div className="d-grid m-2 mt-3 background_form rounded justify-content-center">
                <h4 className="m-2">Descripción</h4>
                <p className="m-2"><strong>{store.profileCompany.description}</strong></p>
            </div>

        </div>
    )
}