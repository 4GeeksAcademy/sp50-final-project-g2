import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Import pages or views
import { Home } from "./pages/Home.jsx";
import { OffersPublic } from "./pages/OffersPublic.jsx";
import { OffersCandidate } from "./pages/OffersCandidate.jsx";
import { Offer } from "./pages/Offer.jsx";
import { MyOffers } from "./pages/MyOffers.jsx";
import { Inicio } from "./pages/Inicio.jsx";
import { Login } from "./pages/Login.jsx";
import { Profile } from "./pages/Profile.jsx";
import { UpdateProfile } from "./pages/UpdateProfile.jsx";
import { AddSocialNetwork } from "./pages/AddSocialNetwork.jsx";
import { UpdateSocialNetwork } from "./pages/UpdateSocialNetwork.jsx";
import { CreateOffer } from "./pages/CreateOffer.jsx";
import { UpdateOffersCompany } from "./pages/UpdateOffersCompany.jsx";
import { SeeCandidates } from "./pages/SeeCandidates.jsx";
import { SeeInfluencerProfile} from "./pages/SeeInfluencerProfile.jsx";
// Import styles
import 'bootswatch/dist/sandstone/bootstrap.min.css';
import "../styles/home.css";
// Import components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Inscripcion } from "./pages/Inscripcion.jsx";
import { AllOffersCandidates } from "./pages/AllOffersCandidates.jsx";
import { ProfileCompany } from "./pages/ProfileCompany.jsx";



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
                        <Route element={<Inicio/>} path="/"/>
                        <Route element={<Home />} path="/signup" />
                        <Route element={<Login />} path="/login"/>
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<UpdateProfile />} path="/update-profile" />
                        <Route element={<AddSocialNetwork />} path="/add-socialnetwork" />
                        <Route element={<UpdateSocialNetwork />} path="/update-socialnetwork/:idsocialnetwork" />
                        <Route element={<Inscripcion/>} path="/register" />
                        <Route element={<CreateOffer />} path="/create-offer" />
                        <Route element={<UpdateOffersCompany />} path="/update-offer/:idoffer"/>
                        <Route element={<OffersPublic />} path="/offers" />
                        <Route element={<SeeCandidates />} path="/company/my-offers/:offer_id/influencers" />
                        <Route element={<Offer />} path="/oneOffer" />
                        <Route element={<OffersCandidate/>} path="/offer-candidates"/>
                        <Route element={<MyOffers />} path="/company/my-offers" />
                        <Route element={<AllOffersCandidates />} path="/company/my-offers/all-candidates"/>
                        <Route element={<ProfileCompany/>} path="/company/profile" />
                        <Route element={<SeeInfluencerProfile />} path="company/my-offers/:offer_id/influencers/influencer/:influencer_id/profile"/>
                        <Route element={<h1 className="text-center">Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};


export default injectContext(Layout);
