import React from "react";


export const NavbarFiltros = () => {


    return(
        <>
        <div className="container-fluid">
            <div className="row">    
                    <div className="container-fluid">
                        <div className="card text-center container-fluid ">
                            <div className="card text-center container-fluid  my-3">
                                <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">Defaucheck</label>
                                </div>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked=''/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">Checkedcheckbox</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1"> Defaultradio</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked=''/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">Defaultchecked radio</label>
                                <label htmlFor="customRange1" className="form-label">Examplerange</label>
                                <input type="range" className="form-range" id="customRange1"></input> 
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">Defaucheck</label>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked=''/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">Checkedcheckbox</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1"> Defaultradio</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked=''/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">Defaultchecked radio</label>
                                <label htmlFor="customRange1" className="form-label">Examplerange</label>
                                <input type="range" className="form-range" id="customRange1"></input>      
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">Defaucheck</label>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked=''/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">Checkedcheckbox</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1"> Defaultradio</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked=''/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">Defaultchecked radio</label>
                                <label htmlFor="customRange1" className="form-label">Examplerange</label>
                                <input type="range" className="form-range" id="customRange1"></input>           
                            </div>           
                        </div>
                    </div>
            </div>   
        </div>
        </>
    )
}