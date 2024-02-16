const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			isLoggedIn: false,
			mailValidated: false,
			isInfluencer: false,
			user: null,
			profile: null,
			imageProfile: null,
			socialNetworks: null,
			currentSocialNetwork: null,
			seeSocialNetworkForCompany: null,
			offersCompany: null,
			currentOffer: null,
			candidates: [],
			offer: [],
			offersPublic: null,
			oneOffer: null,
			registerCandidates: null,
			registerCandidatesUpdates: null,
			profileInfluencer: {},
			candidatesOffersAll: null,
			candidatesOffersPending: null,
			userExist: false,
			userNoExist: false,
			oneOfferCandidate: null,
			profileCompany: {}

		},
		actions: {
			getProfileCompany: async(id_company) => {
				const url = process.env.BACKEND_URL + `/api/company/profile/${id_company}`
				const token = localStorage.getItem('token')
				const options = {
					method: "GET",
            		headers:{
            		    "Authorization" : `Bearer ${token}`
            		},
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log( 'Error', response.status, response.statusText);
        		    return
        		};
        		const data = await response.json();
				console.log(data)
				setStore({ profileCompany: data.results })
			},
			cancelOffer: async(id) =>{
                const url = process.env.BACKEND_URL + "/api/offer-candidates/" + id
                const options = {
                    method: 'DELETE',
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem("token")
                    }
                };
                const response = await fetch(url, options)
                if(!response.ok){
                    console.log('Error al cancelar', response.status, response.statusText)
                };
                const data = await response.json()
				
            },
			getOneOfferCandidates: async (id_offer) => {
				const url = process.env.BACKEND_URL + "/api/offer-candidates/" + id_offer
				const options = {
            		method: "GET",
            		headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		},   
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log(response.status, response.statusText);
        		    return
        		}
        		const data = await response.json();
				setStore({oneOfferCandidate: data.offers})
				localStorage.setItem("oneOfferCandidate", JSON.stringify(data.results))
				
			},
			getOfferByCandidates: async (id) => {
				const url = process.env.BACKEND_URL + "/api/influencers/" + id + "/offer-candidates";
				const options = {
            		method: "GET",
            		headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		},   
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log(response.status, response.statusText);
        		    return
        		}
        		const data = await response.json();
				setStore({registerCandidates: data.offers});
				getActions().handleRegisterCandidatedUpdate();
				localStorage.setItem("registerCandidates", JSON.stringify(data.offers))
				
			},
			getOffers: async () => {
				const response = await fetch (process.env.BACKEND_URL + "/api/offers-public")
				if (!response.ok) return	
				const data = await response.json();
				setStore ({offersPublic: data.results.offers})
			},
			// No la estoy utilizando
			getOneOffer: async (id_offer) => {
				const url = process.env.BACKEND_URL+ "/api/offers/" + id_offer
				const options = {
					method: "GET",
					headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		}  
        		};
        		const response = await fetch(url, options);
        		if (response.ok){
					const data = await response.json();
					console.log(data);
					setStore({ oneOffer: data.results.offer });
        		} else {
					console.log("Error: ", response.status, response.statusText);
				}
			},
			handleOfferPublic: (obj) => {
				setStore({oneOffer: obj})
			},
			getMessage: async () => {
				try {
					// Fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await response.json()
					setStore({message: data.message})
					return data;  // Don't forget to return something, that is how the async resolves
				} catch(error) {
					console.log("Error loading message from backend", error)
				}
			},
			validMail: async (email) => {
					const url = process.env.API_MAIL + email + process.env.API_MAIL2;
					const options = {
						method: 'GET'
					};
					const response = await fetch(url, options);
					if (response.ok){
						const data = await response.json();
						const results= data.data.status;
						if (results == "valid") {
							setStore({mailValidated: true});
							console.log(JSON.stringify(results));
							console.log(getStore().mailValidated);
							return JSON.stringify(results)
						} else {
							setStore({mailValidated: false});
							console.log(JSON.stringify(results));
							console.log(getStore().mailValidated);
							return JSON.stringify(results)
						}
					} else {
						console.log('Error: ', response.status, response.statusText);
						setStore({mailValidated: false});
					}
			},
			login: (token, influencer, user, profile) =>{
				if (!token){
					setStore({isLoggedIn: false})
				} else {
					setStore({isLoggedIn: true});
					setStore({isInfluencer: influencer});
					localStorage.setItem("token", token);
					localStorage.setItem("is_influencer", influencer);
					localStorage.setItem("user", JSON.stringify(user));
					localStorage.setItem("profile", JSON.stringify(profile));
					if (localStorage.getItem("is_influencer") == "false"){
						getActions().allOffersCandidatesbyCompany()
					} 
				}
			},
			logout: () =>{
				setStore({isLoggedIn: false});
				localStorage.removeItem("token");
				localStorage.removeItem("is_influencer");
				localStorage.removeItem("user");
				localStorage.removeItem("profile");
				localStorage.removeItem("registerCandidates");
				setStore({registerCandidates: null})
				setStore({user: null});
				setStore({isInfluencer: null});
				setStore({profile: null});
				setStore({candidatesOffersAll: null});
				setStore({userExist: false});
				setStore({userNoExist: false});
				setStore({imageProfile: null});
				setStore({seeSocialNetworkForCompany: null});
				setStore({registerCandidatesUpdates: null});
				setStore({candidatesOffersAll: null});
				setStore({candidatesOffersPending: null})
			},
			isLogged: () => {
				if (localStorage.getItem("token")){
					setStore({isLoggedIn: true});
					const change = localStorage.getItem("is_influencer");
					if (change == "false"){
						setStore({isInfluencer: false})
					} else {
						setStore({isInfluencer: true})
					}
					setStore({user: JSON.parse(localStorage.getItem("user"))});
					setStore({profile: JSON.parse(localStorage.getItem("profile"))});
					setStore({registerCandidates: JSON.parse(localStorage.getItem("registerCandidates"))});
					if (localStorage.getItem("is_influencer") == "false"){
						getActions().handleOffersCompany(); 
						getActions().allOffersCandidatesbyCompany()
					} else {
						getActions().handleSocialNetworks();
					}
				} 
				else {
					setStore({isLoggedIn: false})
				}
			},
			handleUserExist: () =>{
				setStore({userExist: true})
			},
			handleUserNoExist: () =>{
				setStore({userNoExist: true})
			},
			handleOfferPublic: (obj) => {
				setStore({oneOffer: obj})
			},
			handleInfluencer: (value , id) =>{
				if (value == true){
					setStore({isInfluencer: true});
					getActions().getOfferByCandidates(id);
				} else {
					setStore({isInfluencer: false});
					// Probablemente leamos las ofertas publicadas por las empresas
				}
			},
			handleUser: (user, profile) =>{
				setStore({user: user});
				setStore({profile: profile});
				getActions().isLogged(user, profile)
			},
			updateProfile: (profile) => {
				setStore({profile: profile});
				localStorage.setItem("profile", JSON.stringify(profile));
				setStore({imageProfile: null})
			},
			handleSocialNetworks: async () =>{
				const url = process.env.BACKEND_URL + "/api/social-networks/" + getStore().profile.id;
        		const options = {
            		method: "GET",
            		headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		},   
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log(response.status, response.statusText);
        		    return
        		}
        		const data = await response.json();
        		console.log(data);
				setStore({socialNetworks: data.results})
			},
			handleCurrentSocialNetwork: (obj) =>{
				setStore({currentSocialNetwork: obj})
			},
			seeSocialNetwork: async (id_influencer) =>{
				const url = process.env.BACKEND_URL + "/api/social-networks/" + id_influencer;
        		const options = {
            		method: "GET",
            		headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		},   
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log(response.status, response.statusText);
        		    return
        		}
        		const data = await response.json();
        		console.log(data);	
				setStore({seeSocialNetworkForCompany: data.results})
			},
			handleCurrentOffer: (obj) =>{
				setStore({currentOffer: obj})
			},
			handleOffersCompany: async() =>{
				const url = process.env.BACKEND_URL + "/api/offers-data/" + getStore().profile.id;
        		const options = {
            		method: "GET",
            		headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		},   
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log(response.status, response.statusText);
        		    return
        		}
        		const data = await response.json();
        		console.log('Response: ',data);
				setStore({offersCompany: data.results.offers})
			},
			uploadFile: async (fileToUpload) => {
				const data = new FormData();
				data.append("image", fileToUpload);
				const url = process.env.BACKEND_URL + '/api/upload';
				const options = {
				  method: "POST",
				  body: data,
				  headers: {
					Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`
				  }
				};
				const response = await fetch(url, options)
				if (response.ok) {
				  const data = await response.json();
				  console.log(data);  // data contiene la url de la imagen
				  setStore({imageProfile: data.results})
				  return data;
				} else {
				  console.log('error', response.status, response.text)
				  return "No image url"
				}
			},
			getCandidates: async(offer_id) =>{
				const url = process.env.BACKEND_URL + `/api/company/offers/${offer_id}/influencers`
				console.log('Url', url)
				const token = localStorage.getItem("token")
				const options = {
					method : 'GET',
					headers:{
						'Authorization': `Bearer ${token}`
					},										
				};
				const response = await fetch(url, options)
				if (!response.ok){
					console.log('Error, no consigue conectar', response.status, response.text)
				};
				const data = await response.json()
				console.log(data) //Debería tener los datos de los postulantes
				setStore({candidates: data.results.offers});
				console.log('Datos guardados en la store')
			},
			acceptCandidate: async(offer_id, influencer_id) =>{				
				const url = process.env.BACKEND_URL + `/api/company/${offer_id}/offer-candidates/${influencer_id}`
				const options = {
					method: 'PUT',
					body: JSON.stringify({"status_candidate": "accepted" }),
					headers:{
						"Content-Type": "application/json",
                		"Authorization" : "Bearer " + localStorage.getItem("token")
					}
				}
				const response = await fetch(url,options)
				if(!response.ok){
					console.log('Error', response.status, response.statusText )
				};
				const data = await response.json()
				console.log(data)
			},
			refuseCandidate: async(offer_id, influencer_id) =>{
				console.log("Refusing candidate. Offer ID:", offer_id, "Influencer ID:", influencer_id);
				const url = process.env.BACKEND_URL + `/api/company/${offer_id}/offer-candidates/${influencer_id}`
				const options = {
					method: 'PUT',
					body: JSON.stringify({"status_candidate": "refused" }),
					headers:{
						"Content-Type": "application/json",
                		"Authorization" : "Bearer " + localStorage.getItem("token")
					}
				}
				const response = await fetch(url,options)
				if(!response.ok){
					console.log('Error', response.status, response.statusText )
				};
				const data = await response.json()
				console.log(data)

			},
			handleRegisterCandidatedUpdate: () =>{
				getStore().registerCandidates.map((item, id) => {
					if (`${item.status_candidate}` == "accepted" || `${item.status_candidate}` == "refused"){
						const arr = []
                    	arr.push(item.id)
						setStore({registerCandidatesUpdates: arr})
						return 
				}})
			},
			handleCandidatesPending: () =>{
				const arr = getStore().candidatesOffersAll.filter((item) => (`${item.status_candidate}` == "pending" && `${item.status_influencer}` == "active"))
				if (arr.length > 0){setStore({candidatesOffersPending: arr})}
			},

			closeOffer: async(offer_id) =>{
				const url =process.env.BACKEND_URL + `/api/company/${offer_id}`
				console.log('Url', url)
				const options = {
					method: 'PUT',
					body: JSON.stringify({"status": "closed" }),
					headers:{
						"Content-Type": "application/json",
                		"Authorization" : "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options)
				if(!response.ok){
					console.log('Error de put', response.status, response.statusText)
				};
				const data = await response.json()
				console.log(data)
			},
			getInfluencerProfile: async(id_influencer) =>{
				const url = process.env.BACKEND_URL + `/api/influencer/profile/${id_influencer}`
				console.log('URL', url)
				const token = localStorage.getItem("token")
				const options = {
					method: 'GET',
					headers:{
						"Content-Type": "application/json",
						'Authorization': `Bearer ${token}`
					},
				};
				const response = await fetch(url, options)
				if(!response.ok){
					console.log('Error', response.status, response.text)
				};
				const data = await response.json()
				console.log("Resultados getInfluencerProfile", data)
				setStore({profileInfluencer: data.results});
      },				      
			allOffersCandidatesbyCompany: async() =>{
				const url = process.env.BACKEND_URL + "/api/company/offers/candidates-influencers" ;
        		const options = {
            		method: "GET",
            		headers:{
            		    "Content-Type": "application/json",
            		    "Authorization" : "Bearer " + localStorage.getItem("token")
            		},   
        		};
        		const response = await fetch(url, options);
        		if (!response.ok){
        		    console.log(response.status, response.statusText);
        		    return
        		}
        		const data = await response.json();
        		console.log('Response: ',data);
				setStore({candidatesOffersAll: data.results.offers});
				getActions().handleCandidatesPending()
			}
		}
	};
};


export default getState;