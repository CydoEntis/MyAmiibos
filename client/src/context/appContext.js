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
	UPDATE_COLLECTION,
	FOUND_AMIIBO_SUCCESS,
	SET_FILTER,
	TOGGLE_FILTER,
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
	modifiedAmiibos: [],
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
	activeCollection: 'all',
	sortType: 'default',
	sortData: [
		{
			id: 1,
			name: 'Id',
			isActive: true,
			sortType: 'default',
		},
		{
			id: 2,
			name: 'A-Z',
			isActive: false,
			sortType: 'a-z',
		},
		{
			id: 3,
			name: 'Series',
			isActive: false,
			sortType: 'series',
		},
		{
			id: 4,
			name: 'Date',
			isActive: false,
			sortType: 'date',
		},
	],
	collectionData: [
		{
			id: 1,
			type: 'all',
			isActive: true,
			text: 'All Amiibos',
		},
		{
			id: 2,
			type: 'collected',
			isActive: false,
			text: 'My Collection',
		},
		{
			id: 3,
			type: 'wishlisted',
			isActive: false,
			text: 'My Wishlist',
		},
	],
	filterType: 'All',
	filterIsOpen: false,
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

	const filterAmiiboType = async ({ type }) => {
		dispatch({
			type: FILTER_AMIIBOS_LOADING,
			payload: { amiibos: state.allAmiibos },
		});

		let filteredAmiibos;

		if (type === 'all') {
			filteredAmiibos = state.allAmiibos;
		} else {
			filteredAmiibos = state.allAmiibos.filter((amiibo) => {
				return amiibo.type.toLowerCase() === type.toLowerCase();
			});
		}

		dispatch({
			type: FILTER_AMIIBOS_SUCCESS,
			payload: {
				amiibos: filteredAmiibos,
				numOfPages: Math.ceil(filteredAmiibos.length / state.limit),
				pageNumbers: [
					...Array(
						Math.ceil(filteredAmiibos.length / state.limit) + 1
					).keys(),
				].slice(1),
			},
		});
	};

	const sortAmiibos = (sort, index) => {
		dispatch({
			type: SORT_AMIIBOS_LOADING,
		});

		let sorted;
		if (sort === 'default') {
			sorted = state.modifiedAmiibos.sort((a, b) => {
				let amiiboIdOne = a.head + a.tail;
				let amiiboIdTwo = b.head + b.tail;
				return amiiboIdOne > amiiboIdTwo ? 1 : -1;
			});
		} else if (sort === 'a-z') {
			sorted = state.modifiedAmiibos.sort((a, b) =>
				a.name > b.name ? 1 : -1
			);
		} else if (sort === 'series') {
			sorted = state.modifiedAmiibos.sort((a, b) =>
				a.gameSeries > b.gameSeries ? 1 : -1
			);
		} else if (sort === 'date') {
			sorted = state.modifiedAmiibos.sort((a, b) =>
				a.release > b.release ? 1 : -1
			);
		} else if (sort === 'collection') {
			sorted = state.modifiedAmiibos.filter(
				(amiibo) => amiibo.collected === true
			);
		} else if (sort === 'wishlist') {
			sorted = state.modifiedAmiibos.filter(
				(amiibo) => amiibo.wishlisted === true
			);
		} else if (sort === 'all') {
			sorted = state.allAmiibos;
		}

		const updatedSort = state.sortData.map((sort, sortIndex) => {
			if (sortIndex === index) sort.isActive = true;
			else sort.isActive = false;

			return sort;
		});

		dispatch({
			type: SORT_AMIIBOS_SUCCESS,
			payload: {
				amiibos: sorted,
				updatedSort,
				numOfPages: Math.ceil(sorted.length / state.limit),
				pageNumbers: [
					...Array(Math.ceil(sorted.length / state.limit) + 1).keys(),
				].slice(1),
			},
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
		const foundAmiibo = state.allAmiibos.filter(
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
		const updatedList = state.modifiedAmiibos;
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
			const { data: dbAmiibos } = await axios.get(
				endpoint + `?userId=${state.user._id}`
			);

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

	const setCollection = (collection, index) => {
		getAmiibos(collection);
		setFilter("All");

		const updatedCollections = state.collectionData.map(
			(collection, collectionIndex) => {
				if (collectionIndex === index) collection.isActive = true;
				else collection.isActive = false;

				return collection;
			}
		);

		const sortData = [
			{
				id: 1,
				name: 'Id',
				isActive: true,
				sortType: 'default',
			},
			{
				id: 2,
				name: 'A-Z',
				isActive: false,
				sortType: 'a-z',
			},
			{
				id: 3,
				name: 'Series',
				isActive: false,
				sortType: 'series',
			},
			{
				id: 4,
				name: 'Date',
				isActive: false,
				sortType: 'date',
			},
		];

		dispatch({
			type: UPDATE_COLLECTION,
			payload: { updatedCollections, collection, sortData },
		});
	};

	const searchAmiibos = (searchValue) => {
		let foundAmiibos;

		if (searchValue === '') {
			foundAmiibos = state.allAmiibos;
		} else {
			foundAmiibos = state.allAmiibos.filter((amiibo) => {
				return amiibo.name.toLowerCase() === searchValue.toLowerCase();
			});
		}

		dispatch({
			type: FOUND_AMIIBO_SUCCESS,
			payload: {
				amiibos: foundAmiibos,
				numOfPages: Math.ceil(foundAmiibos.length / state.limit),
				pageNumbers: [
					...Array(
						Math.ceil(foundAmiibos.length / state.limit) + 1
					).keys(),
				].slice(1),
			},
		});
	};

	const setFilter = (filterType) => {
		dispatch({ type: SET_FILTER, payload: { filterType } });
	};

	const toggleFilter = (filterIsOpen) => {
		dispatch({
			type: TOGGLE_FILTER,
			payload: { filterIsOpen },
		});
	};

	const values = {
		...state,
		displayAlert,
		userAuth,
		logout,
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
		getAmiibos,
		setCollection,
		searchAmiibos,
		setFilter,
		toggleFilter,
	};

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, useAppContext, AppProvider };
