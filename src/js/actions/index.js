
export const USER_LOGIN = 'USER_LOGIN';

export function userLogin(userName){
	return {
		type: USER_LOGIN,
		userName
	}
}

export const MESSAGE = 'MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const NOTIFICATION = 'NOTIFICATION';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export function addNotification(message){
	return {
		type: ADD_NOTIFICATION,
		...message
	}
}
export function addMessage(message){
	return {
		type: ADD_MESSAGE,
		...message
	}
}