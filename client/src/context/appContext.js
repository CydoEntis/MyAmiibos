import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	USER_AUTH_BEGIN,
	USER_AUTH_SUCCESS,
	USER_AUTH_ERROR,
	LOGOUT_USER,
	GET_AMIIBOS_LOADING,
	GET_AMIIBOS_SUCCESS,
	GET_AMIIBOS_ERROR,
	GO_TO_PAGE,
	NEXT_PAGE,
	PREV_PAGE,
	SELECT_AMIIBO,
	CLEAR_AMIIBO,
	SHOW_DETAILS,
	HIDE_DETAILS,
	GET_ALL_AMIIBOS_LOADING,
	GET_ALL_AMIIBOS,
	// ADD_TO_COLLECTION_LOADING,
	// ADD_TO_COLLECTION_SUCCESS,
	// ADD_TO_COLLECTION_ERROR,
	// REMOVE_FROM_COLLECTION_LOADING,
	// REMOVE_FROM_COLLECTION_SUCCESS,
	// REMOVE_FROM_COLLECTION_ERROR,
} from './actions';
import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
	cancelled: false,
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	amiiboList: [],
	collectedCount: 0,
	wishlistCount: 0,
	page: 1,
	numOfPages: 1,
	currentPage: 1,
	maxPages: 4,
	pageNumbers: [],
	limit: 25,
	showDetails: false,
	selectedAmiibo: {},
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const authFetch = axios.create({
		baseURL: '/api/v1',
	});

	authFetch.interceptors.request.use(
		(config) => {
			config.headers.common['Authorization'] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				logout();
			}
			return Promise.reject(error);
		}
	);

	const amiiboFetch = axios.create({
		baseURL: 'https://www.amiiboapi.com/api/amiibo/',
	});

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	const userAuth = async ({ currentUser, endPoint, alertText }) => {
		console.log(currentUser);
		dispatch({ type: USER_AUTH_BEGIN });
		try {
			const { data } = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			);

			console.log(data);
			const { user, token } = data;

			dispatch({
				type: USER_AUTH_SUCCESS,
				payload: {
					user,
					token,
					alertText,
				},
			});

			addUserToLocalStorage({ user, token });
		} catch (error) {
			dispatch({
				type: USER_AUTH_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}

		clearAlert();
	};

	const logout = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	const fetchAmiibos = async ({ type, charName = '' }) => {
		dispatch({ type: GET_AMIIBOS_LOADING });

		// let endPoint = '';

		// if (type === 'all') {
		// 	endPoint = '';
		// } else if (type === 'figure') {
		// 	endPoint = '/?type=figure';
		// } else if (type === 'card') {
		// 	endPoint = '/?type=card';
		// } else if (type === 'yarn') {
		// 	endPoint = '/?type=yarn';
		// } else if (type === 'search') {
		// 	endPoint = '/?name=' + charName;
		// }

		try {
			const { data: rawAmiibos } = await amiiboFetch();
			const { data: adAmiibos } = await axios.get('/api/v1/amiibos/all');

			const formattedAmiibos = [];
			for (let amiibo of rawAmiibos.amiibo) {
				let amiiboId = amiibo.head + amiibo.tail;
				let formattedAmiibo = {
					amiiboSeres: amiibo.amiiboSeries,
					character: amiibo.character,
					gameSeries: amiibo.gameSeries,
					head: amiibo.head,
					tail: amiibo.tail,
					image: amiibo.image,
					release: amiibo.release.na,
					type: amiibo.type,
					collected: false,
					wishlisted: false,
					amiiboId: amiiboId,
				};

				for (let myAmiibo of adAmiibos.amiibos) {
					if (amiiboId === myAmiibo.amiiboId) {
						formattedAmiibo.collected = myAmiibo.collected;
						formattedAmiibo.wishlisted = myAmiibo.wishlisted;
					}
				}

				formattedAmiibos.push(formattedAmiibo);
			}

			console.log(formattedAmiibos);

			dispatch({
				type: GET_AMIIBOS_SUCCESS,
				payload: {
					amiiboList: formattedAmiibos,
					numOfPages: Math.ceil(
						formattedAmiibos.length / state.limit
					),
					pageNumbers: [
						...Array(
							Math.ceil(formattedAmiibos.length / state.limit) +
								1
						).keys(),
					].slice(1),
				},
			});
		} catch (error) {
			dispatch({
				type: GET_AMIIBOS_ERROR,
				payload: { msg: error.response.amiiboList.msg },
			});
		}
	};

	const goToPage = (newPage) => {
		console.log(newPage);
		dispatch({
			type: GO_TO_PAGE,
			payload: {
				currentPage: newPage,
			},
		});
	};

	const nextPage = () => {
		dispatch({ type: NEXT_PAGE });
	};

	const prevPage = () => {
		dispatch({ type: PREV_PAGE });
	};

	const getSelectedAmiibo = async (amiibo) => {
		const { head, tail } = amiibo;
		try {
			const { data } = await axios.get(`/api/v1/amiibos/${head + tail}`);
			const { amiibo: selectedAmiibo } = data;

			if (selectedAmiibo[0]) {
				const formattedAmiibo = {
					...selectedAmiibo[0],
					collected: selectedAmiibo[0].collected,
					wishlisted: selectedAmiibo[0].wishlisted,
				};

				dispatch({
					type: SELECT_AMIIBO,
					payload: { selectedAmiibo: formattedAmiibo },
				});
			} else {
				dispatch({
					type: SELECT_AMIIBO,
					payload: { selectedAmiibo: amiibo },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const clearSelectedAmiibo = () => {
		dispatch({ type: CLEAR_AMIIBO });
	};

	const showAmiiboDetails = () => {
		dispatch({ type: SHOW_DETAILS });
	};

	const hideAmiiboDetails = () => {
		dispatch({ type: HIDE_DETAILS, payload: { selectedAmiibo: {} } });
	};

	const saveAmiibo = async (amiiboData) => {
		console.log(amiiboData);
		try {
			await axios.post('/api/v1/amiibos/save', amiiboData);
		} catch (error) {
			console.log(error);
		}
	};

	const updateAmiibo = async (amiiboData) => {
		try {
			await axios.post('/api/v1/amiibos/update', amiiboData);
		} catch (error) {
			console.log(error);
		}
	};

	// const getAmiiboCollection = async () => {
	// 	dispatch({ type: GET_ALL_AMIIBOS_LOADING });
	// 	try {
	// 		const { data } = await axios.get('/api/v1/amiibos/all');
	// 		const { amiibos } = data;
	// 		const collected = amiibos.filter(
	// 			(amiibo) => amiibo.collected === true
	// 		);

	// 		dispatch({
	// 			type: GET_ALL_AMIIBOS,
	// 			payload: {
	// 				amiibos: collected,
	// 				collectedCount: collected.length,
	// 				numOfPages: Math.ceil(collected.length / state.limit) || 0,
	// 				pageNumbers: [
	// 					...Array(
	// 						Math.ceil(collected.length / state.limit) + 1
	// 					).keys(),
	// 				].slice(1),
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const getWishlistAmiibos = async () => {
	// 	dispatch({ type: GET_ALL_AMIIBOS_LOADING });
	// 	try {
	// 		const { data } = await axios.get('/api/v1/amiibos/all');
	// 		const { amiibos } = data;
	// 		const wishlisted = amiibos.filter(
	// 			(amiibo) => amiibo.wishlisted === true
	// 		);

	// 		console.log(wishlisted);

	// 		dispatch({
	// 			type: GET_ALL_AMIIBOS,
	// 			payload: {
	// 				amiibos: wishlisted,
	// 				wishlistCount: wishlisted.length,
	// 				numOfPages: Math.ceil(wishlisted.length / state.limit),
	// 				pageNumbers: [
	// 					...Array(
	// 						Math.ceil(wishlisted.length / state.limit) + 1
	// 					).keys(),
	// 				].slice(1),
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const values = {
		...state,
		displayAlert,
		userAuth,
		logout,
		fetchAmiibos,
		goToPage,
		nextPage,
		prevPage,
		getSelectedAmiibo,
		clearSelectedAmiibo,
		showAmiiboDetails,
		hideAmiiboDetails,
		saveAmiibo,
		updateAmiibo,
		// getAmiiboCollection,
		// getWishlistAmiibos,
	};

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, useAppContext, AppProvider };
