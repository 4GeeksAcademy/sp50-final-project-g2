import React from "react";
import { Link } from "react-router-dom";


export const Inicio = () => {


    return (
        <div>
            <Link to="/signup">
                <button>Signup</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
            
        </div>
    )
}