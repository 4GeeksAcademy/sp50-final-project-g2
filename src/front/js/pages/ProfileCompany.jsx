import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";


export const ProfileCompany = () => {
    const { store, actions } = useContext(Context)
    const { id_company } = useParams()

    useEffect(() => {
        actions.getProfileCompany(id_company)
    }, [])


    return (
        <div>
            <h2 className="text-center mt-4 mb-5 title-style">Perfil</h2>
            <div className="container-fluid d-flex mt-3 justify-content-center">
                <div className="col-3 me-2">
                    <img src={store.profileCompany.profile_img ? store.profileCompany.profile_img : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"} style={{objectFit: "cover", aspectRatio: "1/1", width: "100%", border: "solid", borderWidth: "4px", borderColor: "#FFC66B"}} className="avatar-img rounded-circle img-fluid size-images"></img>
                    <h3 className="m-2"></h3>
                </div>
                <div className="col-sx-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-grid background_form justify-content-start text-start ps-5 ms-1" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                    <h4 className="m-2 mt-3"><strong> Datos </strong></h4>
                    <p className="m-2">Nombre: <strong>{store.profileCompany.name}</strong></p>
                    <p className="m-2">CIF: <strong>{store.profileCompany.cif}</strong></p>
                    <p className="m-2">Industria: <strong>{store.profileCompany.industry}</strong></p>
                    <p className="m-2">Página web: <strong><a href={`https://${store.profileCompany.website}`} target="_blank" className="text-dark ms-1" rel="noopener noreferrer">{store.profileCompany.website}</a></strong></p>
                    <p className="m-2">País y código postal: <strong>{store.profileCompany.country} - {store.profileCompany.zip_code} </strong></p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
            <div className="d-grid col-9 m-2 mt-3 mb-3 justify-content-center" style={{border: "solid", borderColor: "#FFC66B", borderRadius: "15px", backgroundColor: "#FFFEF8"}}>
                <h4 className="text-center mt-3">Descripción</h4>
                <p className="ms-3 my-2"><strong>{store.profileCompany.description}</strong></p>
            </div>
            </div>
            <Link to="/offer-candidates" className="text-secondary m-2">
                <p className="text-end m-1 me-5">Volver a las candidaturas</p>
            </Link>
        </div>
    )
}