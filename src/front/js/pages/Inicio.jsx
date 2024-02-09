import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Fondo from "../../img/fondo 1.png"
import Logo from "../../img/ij.png"
import Influencer from "../../img/influencer.png"
import Wifi from "../../img/wifii.png"


export const Inicio = () => {
    const navigate = useNavigate()

    const handleclick = () => {
        navigate("/signup")
    }
    

    return (
        <div>  
            <img className="imagenfondo" src={Fondo} style={{ width: 1903, height: 855,}} />
                <div className="row">
                    <div className="col-sm-md-2">
                        <img className="wifi d-sm-none d-md-block" src={Wifi}/>
                        <h1 className="titulo">InfluJobs</h1>
                        <p className="parrafo">Tu plataforma para conectar influencer y empresas</p>
                        <button onClick={handleclick} className="btn btn-warning unete "> Únete ahora!</button>
                        <img className="logo d-sm-none d-md-block" src={Logo}/>
                    </div>
                    <div className="col-sm-md-6">
                        <img className="influencerico d-sm-none d-md-block" src={Influencer}/>
                    </div>
                </div>
        </div>
    )
}