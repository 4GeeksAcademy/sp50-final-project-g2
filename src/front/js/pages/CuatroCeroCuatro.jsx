import React from "react";
import { Link } from "react-router-dom";
import ImagenError from "/workspaces/sp50-final-project-g2/src/front/img/ImagenError.png";
import { useNavigate } from "react-router-dom";

export const CuatroCeroCuatro = () => {
    const navigate = useNavigate()

    const goToHome = () =>{
        navigate('/')
    }
    return (
        <div style={{ position: "relative"}}>
            <img src={ImagenError} alt="Imagen" style={{ width: "100%", height: "100%" }} />
            <button className="btn btn-warning" onClick={goToHome} style={{ position: "absolute", top: "70%", left: "50%", transform: "translate(-50%, -50%)" }}>Volver al Inicio</button>
        </div>
    );
};