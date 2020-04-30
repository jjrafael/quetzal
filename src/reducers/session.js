import constants from '../constants';

const initialState = {
    deviceDetails: {
        platform: null,
        device: null,
        browser: null,
    },
    session: null,
    settings: {
        soundFx: false,
        music: false,
    },
    user: null,
    userType: 'participant',
    loading: {
        show: false,
        title: 'Loading...'
    },
    warningModal: {
        show: false,
        message: 'Encountered an issue, please try again later.',
        title: 'Warning!',
        type: 'warning',
    },

    //requests
    sessionInitializing: false,
    sessionLoading: false,
    sessionReading: false,

    //failures
    initializeError: false,
    sessionError: false,

    //modals
    showModalSignout: false,
    showModalEnterCode: false,
    showModalSettings: false,
    showModalAboutDev: false,
};

export default function Session(state = initialState, action) {
    const { session } = constants;
    switch(action.type) {
        //INITIALIZE_SESSION
        case session.INITIALIZE_SESSION_REQUEST:
            return {
                ...state,
                sessionInitializing: true,
            }
        case session.INITIALIZE_SESSION_SUCCESS:
            return {
                ...state,
                sessionInitializing: false,
                session: {
                    ...action.payload,
                    id: action.response.id,
                },
                initializeError: false,
            }
        case session.INITIALIZE_SESSION_FAILURE:
            return {
                ...state,
                sessionInitializing: false,
                initializeError: action.error,
            }

        //READ SESSION
        case session.READ_SESSION_REQUEST:
            return {
                ...state,
                sessionReading: true,
            }
        case session.READ_SESSION_SUCCESS:
            const data_read = action.notStateSave
                ?   state.session
                : { ...action.response.data(),
                    id: action.response.id }
            return {
                ...state,
                sessionReading: false,
                session: data_read,
                initializeError: false,
            }
        case session.READ_SESSION_FAILURE:
            return {
                ...state,
                sessionReading: false,
                initializeError: true,
            }

        case session.EDIT_SESSION_REQUEST:
            return {
                ...state,
                sessionLoading: true,
            }
        case session.EDIT_SESSION_SUCCESS:
            const isEnd = action.payload.status === 'inactive';
            let data_edit = state.session;

            if(!action.notStateSave){
                data_edit = isEnd ? null : action.payload
            }

            return {
                ...state,
                sessionLoading: false,
                sessionError: false,
                session: data_edit
            }
        case session.EDIT_SESSION_FAILURE:
            return {
                ...state,
                sessionLoading: false,
                sessionError: true,
            }
         case session.LISTEN_SESSION_REQUEST:
            return {
                ...state,
                sessionLoading: true,
            }
        case session.LISTEN_SESSION_SUCCESS:
            const data_listen = {
                ...action.response.data(),
                id: action.response.id
            };
            return {
                ...state,
                sessionLoading: false,
                sessionError: false,
                session: data_listen
            }
        case session.LISTEN_SESSION_FAILURE:
            return {
                ...state,
                sessionLoading: false,
                sessionError: true,
            }

        //MODALS

        case session.MODAL_TOGGLE_SIGNOUT:
            return {
                ...state,
                showModalSignout: action.data,
            }
        case session.MODAL_TOGGLE_ENTER_CODE:
            return {
                ...state,
                showModalEnterCode: action.data,
            }
        case session.MODAL_TOGGLE_SETTINGS:
            return {
                ...state,
                showModalSettings: action.data,
            }
        case session.MODAL_TOGGLE_HOW_PLAY:
            return {
                ...state,
                showModalHowToPlay: action.data,
            }
        case session.MODAL_TOGGLE_ABOUT_DEV:
            return {
                ...state,
                showModalAboutDev: action.data,
            }


        //SIGNOUT
        case session.CLEAR_STATES:
            return {
                ...state,
                session: null,
                userType: 'participant',
                showModalSignout: false,
                showModalEnterCode: false,
                showModalSettings: false,
                showModalAboutDev: false,
            }

        default: 
            return state;
    }
}