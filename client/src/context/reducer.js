import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	USER_AUTH_BEGIN,
	USER_AUTH_ERROR,
	USER_AUTH_SUCCESS,
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
		default:
			throw new Error(`no such action : ${action.type}`);
	}
};

export default reducer;
