import React from "react";


export const NavbarOffers = () => {


    return(
        <>
        <div className="container-fluid col-4 ms-4 mt-3">
            <nav className="navbar ">
                <div className="container-fluid col-10">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-warning" type="submit"> Search </button>
                    </form> 
                </div>
            </nav>
        </div>
        </>
    )
}