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
	ADD_TO_COLLECTION_LOADING,
	ADD_TO_COLLECTION_SUCCESS,
	ADD_TO_COLLECTION_ERROR,
	REMOVE_FROM_COLLECTION_LOADING,
	REMOVE_FROM_COLLECTION_SUCCESS,
	REMOVE_FROM_COLLECTION_ERROR,
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
	myAmiibos: [],
	collectedAmiibos: 0,
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

		let endPoint = '';

		if (type === 'all') {
			endPoint = '';
		} else if (type === 'figure') {
			endPoint = '/?type=figure';
		} else if (type === 'card') {
			endPoint = '/?type=card';
		} else if (type === 'yarn') {
			endPoint = '/?type=yarn';
		} else if (type === 'search') {
			endPoint = '/?name=' + charName;
		}

		try {
			const { data } = await amiiboFetch(endPoint);
			dispatch({
				type: GET_AMIIBOS_SUCCESS,
				payload: {
					allAmiibos: data.amiibo,
					numOfPages: Math.ceil(data.amiibo.length / state.limit),
					pageNumbers: [
						...Array(
							Math.ceil(data.amiibo.length / state.limit) + 1
						).keys(),
					].slice(1),
				},
			});
		} catch (error) {
			dispatch({
				type: GET_AMIIBOS_ERROR,
				payload: { msg: error.response.data.msg },
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

	const getSelectedAmiibo = (amiibo) => {
		dispatch({ type: SELECT_AMIIBO, payload: { selectedAmiibo: amiibo } });
	};

	const clearSelectedAmiibo = () => {
		dispatch({ type: CLEAR_AMIIBO });
	};

	const showAmiiboDetails = () => {
		dispatch({ type: SHOW_DETAILS });
	};

	const hideAmiiboDetails = () => {
		dispatch({ type: HIDE_DETAILS });
	};

	const addAmiiboToCollection = () => {};

	const removeAmiiboFromCollection = () => {};

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
	};

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, useAppContext, AppProvider };
