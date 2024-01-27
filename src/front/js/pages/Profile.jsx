import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const data = store.user;
    const data_user = data.user;
    const data_profile = data.profile;
    console.log(data_user);
    console.log(data_profile);
    const [ firstName, setFirstName ] = useState();


    const handleOnClick= () => actions.logout();

    return (
        !store.isLoggedIn ? <Navigate to='/' /> :
        <div>
            <h1 className="text-center">MI PERFIL</h1>
            { store.isInfluencer ? 
            <div className="text-center">
                <h2>Influencer</h2>
                <div className="container-fluid d-flex">
                    <div className="col-4">
                        <img src="https://social.webestica.com/assets/images/avatar/07.jpg" className="avatar-img rounded-circle border border-white border-3"></img>
                        <h3 className="m-2">Headline</h3>
                        <h4 className="m-2">Principal red social: <strong> Instagram </strong></h4>
                    </div>
                    <div className="col-8 d-grid m-2 background_form rounded justify-content-center">
                        <h4 class="m-2">Datos personales</h4>
                        <p class="m-2">Nombre: <strong> Merlina </strong></p>
                        <p class="m-2">Apellido/s: <strong> Dowgaluk </strong></p>
                        <p class="m-2">Fecha de nacimiento: <strong> 13/06/1997 </strong></p>
                        <p class="m-2">Género: <strong> mujer </strong></p>
                        <p class="m-2">Teléfono: <strong> 661578642 </strong></p>
                        <p class="m-2">País y código postal: <strong> España - 08041 </strong></p>
                    </div>
                </div>
                <div className="d-grid m-2 background_form rounded justify-content-center">
                    <h4 class="m-2">Descripción</h4>
                    <p class="m-2"><strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus scelerisque nisl, nec malesuada purus efficitur sit amet. In eget aliquet nulla. Vestibulum eget lacinia elit. Nunc vitae ante vulputate, convallis tortor non, pretium orci. Nunc viverra mattis augue at auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras cursus viverra metus, a vestibulum ligula lobortis non. Maecenas vel mollis odio. Etiam eget elit tincidunt, blandit erat vitae, tempus nunc. Duis consectetur libero erat, consequat porttitor mauris hendrerit vel. Nullam pellentesque euismod lorem. Aliquam lectus magna, aliquet vel vulputate sed, posuere non enim. </strong></p>
                </div>
                <div className="d-grid m-2 background_form rounded justify-content-center">
                    <h4 class="m-2">Redes sociales:</h4>
                    <ul class="m-2">
                        <li>Red social: <strong> Instagram </strong></li>
                        <li>Url o nickname: <strong> merlidowgaluk </strong></li>
                        <li>Cantidad de seguidores: <strong> 1.500 </strong></li>
                    </ul>
                    <ul class="m-2">
                        <li>Red social: <strong> Facebook </strong></li>
                        <li>Url o nickname: <strong> merlidowgaluk </strong></li>
                        <li>Cantidad de seguidores: <strong> 100 </strong></li>
                    </ul>
                </div>
                <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
            </div>
            : 
            <div className="text-center">
                <h2>Empresa</h2>
                <div>

                </div>
                <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
            </div>
            }       
        </div>
    )
}