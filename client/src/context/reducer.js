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
	UPDATE_COLLECTION,
	FOUND_AMIIBO_SUCCESS,
	SET_FILTER,
	TOGGLE_FILTER
} from './actions';

const reducer = (state, action) => {
	switch (action.type) {
		case DISPLAY_ALERT:
			return {
				...state,
				showAlert: true,
				alertType: 'danger',
				alertText: 'Please provide all values',
			};
		case CLEAR_ALERT:
			return {
				...state,
				showAlert: false,
				alertType: '',
				alertText: '',
			};
		case USER_AUTH_BEGIN:
			return { ...state, isLoading: true };
		case USER_AUTH_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload.user,
				token: action.payload.token,
				showAlert: true,
				alertType: 'success',
				alertText: action.payload.alertText,
			};
		case USER_AUTH_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: 'danger',
				alertText: action.payload.msg,
			};
		case LOGOUT_USER:
			return {
				...state,
				user: null,
				token: null,
			};
		case GET_AMIIBOS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_AMIIBOS_SUCCESS:
			return {
				...state,
				isLoading: false,
				allAmiibos: action.payload.amiibos,
				modifiedAmiibos: action.payload.amiibos,
				numOfPages: action.payload.numOfPages,
				pageNumbers: action.payload.pageNumbers,
				currentPage: 1,
			};
		case GET_AMIIBOS_ERROR:
			return {
				...state,
				isLoading: false,
				// TODO: Add error alerts
			};
		case FILTER_AMIIBOS_LOADING:
			return {
				...state,
				isLoading: true,
				allAmiibos: action.payload.amiibos,
			};
		case FILTER_AMIIBOS_SUCCESS:
			return {
				...state,
				isLoading: false,
				modifiedAmiibos: action.payload.amiibos,
				numOfPages: action.payload.numOfPages,
				pageNumbers: action.payload.pageNumbers,
				currentPage: 1,
				// Add collected amiibos
			};
		case FILTER_AMIIBOS_ERROR:
			return {
				...state,
				isLoading: false,
				// TODO: Add error alerts
			};
		case GO_TO_PAGE:
			return {
				...state,
				currentPage: action.payload.currentPage,
			};
		case NEXT_PAGE:
			return {
				...state,
				currentPage: state.currentPage + 1,
			};
		case PREV_PAGE:
			return {
				...state,
				currentPage: state.currentPage - 1,
			};
		case SELECT_AMIIBO:
			return {
				...state,
				selectedAmiibo: action.payload.selectedAmiibo,
				isLoading: true,
			};
		case CLEAR_AMIIBO:
			return {
				...state,
				selectedAmiibo: {},
			};
		case SHOW_DETAILS:
			return {
				...state,
				showDetails: true,
				isLoading: false,
			};
		case HIDE_DETAILS:
			return {
				...state,
				showDetails: false,
				selectedAmiibo: action.payload.selectedAmiibo,
			};
		case UPDATE_AMIIBO_LIST:
			return {
				...state,
				modifiedList: action.payload.updatedList,
			};
		case FIND_AMIIBO:
			return {
				...state,
				modifiedList: action.payload.result,
			};
		case SORT_AMIIBOS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case SORT_AMIIBOS_SUCCESS:
			return {
				...state,
				isLoading: false,
				sortData: action.payload.updatedSort,
				modifiedAmiibos: action.payload.amiibos,
				numOfPages: action.payload.numOfPages,
				pageNumbers: action.payload.pageNumbers,
				currentPage: 1,
			};
		case SET_COLLECTION:
			return {
				...state,
				collectionType: action.payload.collection,
				activeCollection: action.payload.activeCollection,

			}
		case UPDATE_COLLECTION:
			return {
				...state,
				collectionData: action.payload.updatedCollections,
				activeCollection: action.payload.collection,
				sortData: action.payload.sortData
			}
		case FOUND_AMIIBO_SUCCESS: 
		return {
			...state,
			modifiedAmiibos: action.payload.amiibos,
			numOfPages: action.payload.numOfPages,
			pageNumbers: action.payload.pageNumbers,
		}
		case SET_FILTER:
			return {
				...state,
				filterType: action.payload.filterType,
			}
		case TOGGLE_FILTER:
				return {
					...state,
					filterIsOpen: action.payload.filterIsOpen
				}
		default:
			throw new Error(`no such action : ${action.type}`);
	}
};

export default reducer;
