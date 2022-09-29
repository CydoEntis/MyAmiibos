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
		case LOGOUT_USER :
			return {
				...state,
				user: null,
				token: null,
			}
		case GET_AMIIBOS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_AMIIBOS_SUCCESS:
			return {
				...state,
				isLoading: false,
				allAmiibos: action.payload.allAmiibos,
				numOfPages: action.payload.numOfPages,
				pageNumbers: action.payload.pageNumbers,
				currentPage: 1,
				// Add collected amiibos
			};
		case GET_AMIIBOS_ERROR:
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
			console.log(action.payload)
			return {
				...state,
				selectedAmiibo: action.payload.selectedAmiibo
			}
		case CLEAR_AMIIBO:
			return {
				...state,
				selectedAmiibo: {}
			}
		case SHOW_DETAILS:
			return {
				...state,
				showDetails: true,
			};
		case HIDE_DETAILS:
			return {
				...state,
				showDetails: false,
			};
		case ADD_TO_COLLECTION_LOADING:
			return {};
		case ADD_TO_COLLECTION_SUCCESS:
			return {};
		case ADD_TO_COLLECTION_ERROR:
			return {};
		case REMOVE_FROM_COLLECTION_LOADING:
			return {};
		case REMOVE_FROM_COLLECTION_SUCCESS:
			return {};
		case REMOVE_FROM_COLLECTION_ERROR:
			return {};
		default:
			throw new Error(`no such action : ${action.type}`);
	}
};

export default reducer;
