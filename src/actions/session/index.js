import constants from '../../constants/session';
import { baseURL } from '../../Firebase';

//SESSION
export function initializeSession(data) {
	const ref = baseURL.sessions;
  return {
  	types: [
  		constants.INITIALIZE_SESSION_REQUEST,
  		constants.INITIALIZE_SESSION_SUCCESS,
  		constants.INITIALIZE_SESSION_FAILURE
  	],
  	method: 'add',
  	data: data,
  	callRef: ref,
  }
}

export function readSession(id, notStateSave) {
	const ref = baseURL.sessions.doc(id);
  return {
  	types: [
  		constants.READ_SESSION_REQUEST,
  		constants.READ_SESSION_SUCCESS,
  		constants.READ_SESSION_FAILURE
  	],
  	method: 'get',
  	payload: { notStateSave },
  	callRef: ref,
  }
}

export function editSession(id, data, notStateSave) {
	const ref = baseURL.sessions.doc(id);
  return {
  	types: [
  		constants.EDIT_SESSION_REQUEST,
  		constants.EDIT_SESSION_SUCCESS,
  		constants.EDIT_SESSION_FAILURE
  	],
  	method: 'set',
  	data,
  	payload: { notStateSave },
  	callRef: ref,
  }
}

export function listenSession(id) {
  const ref = baseURL.sessions.doc(id);
  const listenData = {
    returnData: true
  }
  return {
    types: [
      constants.LISTEN_SESSION_REQUEST,
      constants.LISTEN_SESSION_SUCCESS,
      constants.LISTEN_SESSION_FAILURE
    ],
    method: 'listen',
    callRef: ref,
    listenData,
  }
}

//NON-API
export function toggleLoadingOverlay(show, title, extra) {
  return {
    type: constants.TOGGLE_LOADING_OVERLAY,
    data: { show, title, ...extra },
  }
}

export function toggleWarningModal(show, data) {
  return {
    type: constants.TOGGLE_WARNING_MODAL,
    data: { show, ...data },
  }
}

export function setDeviceDetails(data) {
  return {
    type: constants.SET_DEVICE_DETAILS,
    data,
  }
}

export function setSession(data) {
  return {
  	type: constants.SET_SESSION,
    data,
  }
}

export function setSettings(data) {
  return {
  	type: constants.SET_SETTINGS,
    data,
  }
}

export function toggleSignOutModal(show) {
  return {
  	type: constants.MODAL_TOGGLE_SIGNOUT,
    data: show,
  }
}

export function toggleEnterCodeModal(show) {
  return {
  	type: constants.MODAL_TOGGLE_ENTER_CODE,
    data: show,
  }
}

export function toggleSettingsModal(show) {
  return {
  	type: constants.MODAL_TOGGLE_SETTINGS,
    data: show,
  }
}

export function toggleAboutDevModal(show) {
  return {
  	type: constants.MODAL_TOGGLE_ABOUT_DEV,
    data: show,
  }
}

export function clearRdxSession() {
  return {
  	type: constants.CLEAR_STATES,
  }
}