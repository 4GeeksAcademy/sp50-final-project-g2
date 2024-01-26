import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    

    const handleOnClick= () => actions.logout();

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1>PROFILE</h1>
            <div className="text-center">
                <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
            </div>
        </div>
    )
}