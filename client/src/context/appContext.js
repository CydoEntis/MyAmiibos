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
	FILTER_AMIIBOS_LOADING,
	FILTER_AMIIBOS_SUCCESS,
	FILTER_AMIIBOS_ERROR,
	GO_TO_PAGE,
	NEXT_PAGE,
	PREV_PAGE,
	SELECT_AMIIBO,
	CLEAR_AMIIBO,
	SHOW_DETAILS,
	HIDE_DETAILS,
	UPDATE_AMIIBO_LIST,
	FIND_AMIIBO,
	SORT_AMIIBOS_LOADING,
	SORT_AMIIBOS_SUCCESS,
	SET_COLLECTION,
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
	allAmiibos: [],
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
	collectionType: 'all',
	sortType: 'default',
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
		dispatch({ type: USER_AUTH_BEGIN });
		try {
			const { data } = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			);

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

	const fetchAmiibos = async (value) => {
		dispatch({ type: GET_AMIIBOS_LOADING });

		try {
			const { data: dbAmiibos } = await axios.get('/api/v1/amiibos/all');
			let rawAmiibos;
			if (value !== 'all') {
				const { data } = await axios.get(
					`https://www.amiiboapi.com/api/amiibo/?name=${value}`
				);
				rawAmiibos = data;
			} else {
				const { data } = await amiiboFetch();
				rawAmiibos = data;
			}

			const formattedAmiibos = [];
			for (let amiibo of rawAmiibos.amiibo) {
				let amiiboId = amiibo.head + amiibo.tail;
				let formattedAmiibo = {
					name: amiibo.name,
					amiiboSeries: amiibo.amiiboSeries,
					character: amiibo.character,
					gameSeries: amiibo.gameSeries,
					head: amiibo.head,
					tail: amiibo.tail,
					image: amiibo.image,
					release: amiibo.release.na || 'N/A',
					type: amiibo.type,
					collected: false,
					wishlisted: false,
					amiiboId: amiiboId,
					createdAt: null,
				};

				for (let myAmiibo of dbAmiibos.amiibos) {
					if (amiiboId === myAmiibo.amiiboId) {
						formattedAmiibo.collected = myAmiibo.collected;
						formattedAmiibo.wishlisted = myAmiibo.wishlisted;
						formattedAmiibo.createdAt = myAmiibo.createdAt;
					}
				}

				formattedAmiibos.push(formattedAmiibo);
			}

			const collectedAmiibos = formattedAmiibos.filter(
				(amiibo) => amiibo.collected === true
			);
			const wishlistedAmiibos = formattedAmiibos.filter(
				(amiibo) => amiibo.wishlisted === true
			);

			dispatch({
				type: GET_AMIIBOS_SUCCESS,
				payload: {
					amiiboList: formattedAmiibos,
					collectedAmiibos: collectedAmiibos,
					wishlistedAmiibos: wishlistedAmiibos,
					numOfPages: Math.ceil(
						formattedAmiibos.length / state.limit
					),
					pageNumbers: [
						...Array(
							Math.ceil(formattedAmiibos.length / state.limit) + 1
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

	const setCurrentCollection = (collection) => {
		let activeCollection;

		if (collection === 'all') {
			activeCollection = state.allAmiibos;
		} else if (collection === 'collection') {
			activeCollection = state.collectedAmiibos;
		} else if (collection === 'wishlist') {
			activeCollection = state.wishlistedAmiibos;
		}

		dispatch({
			type: SET_COLLECTION,
			payload: { collection, activeCollection },
		});
	};

	const filterAmiiboType = async ({ type }) => {
		dispatch({ type: FILTER_AMIIBOS_LOADING });
		if (type === 'all') {
			try {
				await fetchAmiibos();
				return;
			} catch (error) {
				dispatch({
					type: FILTER_AMIIBOS_ERROR,
					payload: { msg: error.response.msg },
				});
			}
		}

		const filteredAmiibos = state.modifiedList.filter((amiibo) => {
			return amiibo.type.toLowerCase() === type.toLowerCase();
		});

		console.log(filteredAmiibos);

		dispatch({
			type: FILTER_AMIIBOS_SUCCESS,
			payload: {
				modifiedList: filteredAmiibos,
				numOfPages: Math.ceil(filteredAmiibos.length / state.limit),
				pageNumbers: [
					...Array(
						Math.ceil(filteredAmiibos.length / state.limit) + 1
					).keys(),
				].slice(1),
			},
		});
	};

	const sortAmiibos = (sort) => {
		dispatch({
			type: SORT_AMIIBOS_LOADING,
		});


		let sorted;
		if (sort === 'default') {
			sorted = state.allAmiibos.sort((a, b) => {
				let amiiboIdOne = a.head + a.tail;
				let amiiboIdTwo = b.head + b.tail;
				return amiiboIdOne > amiiboIdTwo ? 1 : -1;
			});
		} else if (sort === 'a-z') {
			sorted = state.allAmiibos.sort((a, b) =>
				a.name > b.name ? 1 : -1
			);
		} else if (sort === 'series') {
			sorted = state.allAmiibos.sort((a, b) =>
				a.gameSeries > b.gameSeries ? 1 : -1
			);
		} else if (sort === 'date') {
			sorted = state.allAmiibos.sort((a, b) =>
				a.release > b.release ? 1 : -1
			);
		} else if (sort === 'collection') {
			console.log('collection');
			sorted = state.allAmiibos.filter(
				(amiibo) => amiibo.collected === true
			);
		} else if (sort === 'wishlist') {
			console.log('wishlist');
			sorted = state.allAmiibos.filter(
				(amiibo) => amiibo.wishlisted === true
			);
		} else if (sort === 'all') {
			sorted = state.allAmiibos;
		}

		console.log(sorted);

		dispatch({
			type: SORT_AMIIBOS_SUCCESS,
			payload: { amiibos: sorted },
			numOfPages: Math.ceil(sorted.length / state.limit),
			pageNumbers: [
				...Array(Math.ceil(sorted.length / state.limit) + 1).keys(),
			].slice(1),
		});
	};

	const goToPage = (newPage) => {
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

	const getSelectedAmiibo = async (amiiboId) => {
		const foundAmiibo = state.modifiedList.filter(
			(amiibo) => amiibo.amiiboId === amiiboId
		);

		const amiibo = foundAmiibo[0];

		dispatch({
			type: SELECT_AMIIBO,
			payload: { selectedAmiibo: amiibo },
		});
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

	const findAmiibo = (searchValue) => {
		dispatch({ type: FIND_AMIIBO, payload: { result: state.amiiboList } });
		if (searchValue === '') {
			dispatch({
				type: FIND_AMIIBO,
				payload: { result: state.amiiboList },
			});
		} else {
			const result = state.modifiedList.filter((amiibo) => {
				return amiibo.name.toLowerCase() === searchValue.toLowerCase();
			});

			dispatch({ type: FIND_AMIIBO, payload: { result } });
		}
	};

	const saveAmiibo = async (amiiboData) => {
		try {
			await axios.post('/api/v1/amiibos/save', amiiboData);
		} catch (error) {
			console.log(error);
		}
	};

	const updateAmiibo = async (amiiboData) => {
		try {
			await axios.post('/api/v1/amiibos/update', amiiboData);

			const amiibo = state.amiiboList.find(
				(amiibo) => amiibo.amiiboId === amiiboData.amiiboId
			);
		} catch (error) {
			console.log(error);
		}
	};

	const updateAmiiboList = (index, amiiboData) => {
		const updatedList = state.modifiedList;
		for (let i = 0; i < updatedList.length; i++) {
			if (i === index) {
				updatedList[index] = amiiboData;
			}
		}

		dispatch({ type: UPDATE_AMIIBO_LIST, payload: { updatedList } });
	};

	const getAmiibos = async (collection) => {
		let amiiboCollection = [];

		dispatch({
			type: GET_AMIIBOS_LOADING,
		});

		let endpoint = '/api/v1/amiibos/';

		if (collection === 'all') {
			endpoint += 'all';
		} else if (collection === 'collected') {
			endpoint += 'collected';
		} else if (collection === 'wishlisted') {
			endpoint += 'wishlisted';
		}

		try {
			const { data: dbAmiibos } = await axios.get(endpoint);

			if (collection === 'all') {
				const { data: apiAmiibos } = await amiiboFetch();

				for (let amiibo of apiAmiibos.amiibo) {
					let amiiboId = amiibo.head + amiibo.tail;
					let newAmiibo = {
						name: amiibo.name,
						amiiboSeries: amiibo.amiiboSeries,
						character: amiibo.character,
						gameSeries: amiibo.gameSeries,
						head: amiibo.head,
						tail: amiibo.tail,
						image: amiibo.image,
						release: amiibo.release.na || 'N/A',
						type: amiibo.type,
						collected: false,
						wishlisted: false,
						amiiboId: amiiboId,
						createdAt: null,
					};

					for (let amiibo of dbAmiibos.amiibos) {
						if (amiiboId === amiibo.amiiboId) {
							newAmiibo.collected = amiibo.collected;
							newAmiibo.wishlisted = amiibo.wishlisted;
							newAmiibo.createdAt = amiibo.createdAt;
						}
					}

					amiiboCollection.push(newAmiibo);
				}
			} else {
				amiiboCollection = dbAmiibos.amiibos;
			}

			dispatch({
				type: GET_AMIIBOS_SUCCESS,
				payload: {
					amiibos: amiiboCollection,
					numOfPages: Math.ceil(
						amiiboCollection.length / state.limit
					),
					pageNumbers: [
						...Array(
							Math.ceil(amiiboCollection.length / state.limit) + 1
						).keys(),
					].slice(1),
				},
			});
		} catch (error) {
			dispatch({
				type: GET_AMIIBOS_ERROR,
				// payload: { msg: error.response.amiiboList.msg },
			});
		}
	};

	const values = {
		...state,
		displayAlert,
		userAuth,
		logout,
		fetchAmiibos,
		filterAmiiboType,
		goToPage,
		nextPage,
		prevPage,
		getSelectedAmiibo,
		clearSelectedAmiibo,
		showAmiiboDetails,
		hideAmiiboDetails,
		saveAmiibo,
		updateAmiibo,
		updateAmiiboList,
		findAmiibo,
		sortAmiibos,
		setCurrentCollection,
		getAmiibos,
	};

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, useAppContext, AppProvider };
