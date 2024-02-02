const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			isLoggedIn: false,
			mailValidated: false,
			isInfluencer: null,
			user: null,
			profile: null,
			candidates: [],
			offer: [],
			myOffers: []
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");  // Use getActions to call a function within a fuction
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
			changeColor: (index, color) => {
				const store = getStore();  // Get the store
				// We have to loop the entire demo array to look for the respective index and change its color
				const demo = store.demo.map((element, i) => {
					if (i === index) element.background = color;
					return element;
				});
				setStore({demo: demo});  // Reset the global store
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
					localStorage.setItem("user", user);
					localStorage.setItem("profile", profile)
				}
			},
			logout: () =>{
				setStore({isLoggedIn: false});
				localStorage.removeItem("token");
				localStorage.removeItem("is_influencer");
				//localStorage.removeItem("user");
				//localStorage.removeItem("profile");
				setStore({user: null});
				setStore({isInfluencer: null});
				setStore({profile: null})
			},
			handleInfluencer: (value) =>{
				if (value == true){setStore({isInfluencer: true})}
				else {setStore({isInfluencer: false})}
			},
			handleUser: (user, profile) =>{
				setStore({user: user});
				setStore({profile: profile});
				getActions().isLogged(user, profile)
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
				  console.log(data)  // data contiene la url de la imagen
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
			// getMyOffers: async(id_user_company) =>{
			// 	const url = `https://super-duper-rotary-phone-7v9wrwrxrpx53xjwj-3001.app.github.dev/api/offers/${id_user_company}`
			// 	console.log('Url', url)
			// 	const token = localStorage.getItem("token")
			// 	const options = {
			// 		method: 'GET',
			// 		headers: {
			// 			'Authorization' : `Bearer ${token}`
			// 		},					
			// 	};
			// 	const response = await fetch(url, options)
			// 	if (!response.ok){
			// 		console.log('Error, no recibe respuesta')
			// 	};
			// 	const data = await response.json()
			// 	console.log('getOffers:', data.results)
			// 	setStore({myOffers: data.results.offers})
			// 	console.log('Los datos se han guardado')
			// },
			handleOffersCompany: async() =>{
                const url = process.env.BACKEND_URL + "/api/offer/" + getStore().profile.id;
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
                setStore({offersCompany: data.results.offers})
            },
			isLogged: () => {
                if (localStorage.getItem("token")){
                    setStore({isLoggedIn: true});
                    setStore({isInfluencer: localStorage.getItem("is_influencer")});
                    setStore({user: JSON.parse(localStorage.getItem("user"))});
                    setStore({profile: JSON.parse(localStorage.getItem("profile"))});
                    if (localStorage.getItem("is_influencer") == "false"){
                        getActions().handleOffersCompany();
                    }
                }
                else {
                    setStore({isLoggedIn: false})
                }
            },
			}
		}
	};


export default getState;
