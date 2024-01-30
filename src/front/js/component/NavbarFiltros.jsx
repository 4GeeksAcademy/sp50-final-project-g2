import React from "react";


export const NavbarFiltros = () => {


    return(
        <>
        <ul className="nav flex-column col-1 ms-3">
            <div className="card" >
                <ul className="container p-5">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label class="form-check-label" for="flexCheckDefault">
                         Defaucheckboxxxxxxxxxxxxxxxx
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                        <label class="form-check-label" for="flexCheckChecked">
                            Checkedcheckbox
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Defaultradio
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            Defaultchecked radio
                        </label>
                    </div>
                        <label for="customRange1" class="form-label">Examplerange</label>
                        <input type="range" class="form-range" id="customRange1"></input>
                </ul>
            </div>
        </ul>
        </>
    )
}