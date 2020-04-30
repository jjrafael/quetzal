import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import Header from './Header';
import Body from './Body';
import Page from './Page';
import Loading from './common/Loading';
import ModalSignOut from './modal/ModalSignOut';
import ModalEnterCode from './modal/ModalEnterCode';
import ModalWarning from './modal/ModalWarning';
import ModalAboutDev from './modal/ModalAboutDev';

//actions
import { 
	setDeviceDetails, 
	// readSession,
	toggleWarningModal,
	toggleLoadingOverlay } from '../actions/session';

//misc
import { isMobile } from '../utils/app';
import { 
	// bool,
	setLocalStorage, 
	getAllLocalStorage,
	// clearLocalStorage,
	// getResponse
} from '../utils';

const mapStateToProps = state => {return {
	session: state.session.session,
	user: state.session.user,
	sessionInitializing: state.session.sessionInitializing,
	sessionReading: state.session.sessionReading,
	loading: state.session.loading,
	hasModals: state.session.showModalSignout ||
		state.session.showModalEnterCode
}}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
	  {
		setDeviceDetails,
		toggleLoadingOverlay,
		toggleWarningModal,
		// readSession
	  },
	  dispatch
	)
}

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			device: null,
			cachedSessionChecked: false,
			cacheLoaded: false,
			verifyCacheDone: false,
			cachedIds: null,
			page: null,
		}
	}

	componentDidMount() {
		const navigator = window.navigator;
		const cachedIds = getAllLocalStorage();
		const device = {
			device: isMobile(navigator.userAgent) ? 'mobile' : 'desktop',
			platform: navigator.platform,
			browser: navigator.appCodeName,
		}
		this.props.setDeviceDetails(device);
		this.setState({ device, cachedIds: cachedIds });
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.sessionInitializing !== this.props.sessionInitializing){
			this.props.toggleLoadingOverlay(this.props.sessionInitializing, 'Initializing Session');
		}

		if(prevProps.session !== this.props.session && !!this.props.session){
			//save to local session details
			if(this.props.session.id && this.props.session.status === 'active'){
				setLocalStorage('tyr_sessionId', this.props.session.id);
			}
		}
	}

	closeLoading() {
		//closing loading overlay
		this.props.toggleLoadingOverlay();
	}

	updateLoading(data){
		//update attributes of loading overlay
		this.props.toggleLoadingOverlay(true, data);
	}

	render() {
		const { user, session, hasModals } = this.props;
		const { verifyCacheDone, device, page } = this.state;
		const isLogged = user && user.is_logged;
		const isSessionReady = (isLogged && !!session && verifyCacheDone);
		const cxDevice = device ? device.device : 'desktop';
		const cxHeader = isSessionReady ? '' : '--splash';
		const headerProps = { isSessionReady };

	  return (
		<div className={`page --${cxDevice}`} id="MainPage">
			<Header
				className={cxHeader} 
				headerProps={headerProps} 
				page={page}/>
			<Body className="app-body">
				<Page hasModals={hasModals} page={page} />
			</Body>
			<ModalWarning />
			<ModalSignOut />
			<ModalEnterCode />
			<ModalAboutDev />
			<Loading />
		</div>
	  );
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
