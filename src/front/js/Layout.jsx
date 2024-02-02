import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Import pages or views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
// Import components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Profile } from "./pages/Profile.jsx";
import { UpdateProfile } from "./pages/UpdateProfile.jsx";
import { AddSocialNetwork } from "./pages/AddSocialNetwork.jsx";
import { UpdateSocialNetwork } from "./pages/UpdateSocialNetwork.jsx";
import { CreateOffer } from "./pages/CreateOffer.jsx";


// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // You can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login"/>
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<UpdateProfile />} path="/update-profile" />
                        <Route element={<AddSocialNetwork />} path="/add-socialnetwork" />
                        <Route element={<UpdateSocialNetwork />} path="/update-socialnetwork/:idsocialnetwork" />
                        <Route element={<CreateOffer />} path="/create-offer" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1 className="text-center">Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};


export default injectContext(Layout);
