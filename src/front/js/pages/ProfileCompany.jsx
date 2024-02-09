import React from "react";


export const ProfileCompany = () => {


    return (
        <div>
            <h2 className="title-style">Empresa</h2>
                <div className="container-fluid d-flex mt-3 justify-content-center">
                    <div className="col-3 me-2">
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
                <div className="d-block py-1 m-2 mt-3 background_form rounded justify-content-center">
                    <h4 className="m-2">Ofertas publicadas:</h4>
                    <div className="d-flex justify-content-end me-2">
                        <Link to="/create-offer" className="text-dark text-end">
                            <p className="text-end m-2"><i className="fa-solid fa-plus fa-lg"></i></p>
                        </Link>
                    </div>
               
                </div>
        </div>
    )
}