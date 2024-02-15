import React from "react";


export const Spinner = () =>{
    return(
        <div className="d-flex justify-content-center text-warning" style={{marginTop: "200px", marginBottom: "220px"}} >
            <div className="spinner-border" style={{ width: "15rem", height: "15rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}