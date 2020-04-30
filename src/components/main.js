import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import Header from './Header';
import Body from './Body';
import Loading from './common/Loading';
import ModalSignOut from './modal/ModalSignOut';
import ModalEnterCode from './modal/ModalEnterCode';
import ModalWarning from './modal/ModalWarning';
import ModalAboutDev from './modal/ModalAboutDev';

// pages
// import SplashPage from './SplashPage';
// import HomePage from './HomePage';

// misc
// import { isMobile } from '../utils/app';
// import { 
// 	bool,
// 	setLocalStorage, 
// 	getAllLocalStorage,
// 	clearLocalStorage,
// 	getResponse } from '../utils';
// import { variables } from '../config';

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
		// setDeviceDetails,
		// toggleLoadingOverlay,
		// toggleWarningModal,
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

	render() {
		const { user, session } = this.props;
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
				Render page content here
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
