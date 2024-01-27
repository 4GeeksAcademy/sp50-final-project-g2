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
			user: {}
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
			login: (token) =>{
				if (!token){
					setStore({isLoggedIn: false})
				} else {
					setStore({isLoggedIn: true});
					localStorage.setItem("token", token);
				}
			},
			logout: () =>{
				setStore({isLoggedIn: false});
				localStorage.removeItem("token");
				setStore({user: {}});
				setStore({isInfluencer: null})
			},
			isLogged: () => {
				if (localStorage.getItem("token")){
					setStore({isLoggedIn: true})
				} 
				else {
					setStore({isLoggedIn: false})
				}
			},
			handleInfluencer: (value) =>{
				if (value == true){setStore({isInfluencer: true})}
				else {setStore({isInfluencer: false})}
			},
			handleUser: (data) =>{
				setStore({user: data})
			}
		}
	};
};


export default getState;
