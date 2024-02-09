import React from "react";
import { Link } from "react-router-dom";
import imagen from "/workspaces/sp50-final-project-g2/src/front/img/Home.png";

export const Inicio = () => {
     return (
        <div className="d-flex justify-content-center align-items-center">
             <img src={imagen} className="img-fluid" alt="Imagen de inicio" />
        </div>
    );
}