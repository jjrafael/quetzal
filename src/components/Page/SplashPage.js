import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import Card from '../common/Card';

//actions
import {
	initializeSession,
	toggleEnterCodeModal, 
	toggleWarningModal,
} from '../../actions/session';

//misc
import { getNow } from '../../utils';

const mapStateToProps = state => {
	return {
		deviceDetails: state.session.deviceDetails,
		user: state.session.user,
		userType: state.session.userType,
		sessionDetails: state.sessionDetails,
		loadingOverlay: state.session.loadingOverlay,
		initializeError: state.session.initializeError,
	}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      initializeSession,
      toggleEnterCodeModal,
      toggleWarningModal,
    },
    dispatch
  )
}

class SplashPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loadingTitle: 'Initializing Session...',
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.initializeError !== this.props.initializeError	&& this.props.initializeError){
			this.props.toggleWarningModal(true, {
				title: 'Network Error',
				message: this.props.initializeError.message
			});
		}
	}

	enterCodeModal = () => {
		this.props.toggleEnterCodeModal(true);
	}

	openGuide = () => {
		//NAV
	}

	initSession(user) {
		console.log('jj initSession1');
		const now = getNow();
		const data = {
			created_by: '',
			created_time: now,
			name: '',
			status: 'active',
		}
		this.props.initializeSession(data);
	}

	render() {
		const { loadingOverlay} = this.props;
		const showLogo = !loadingOverlay;

	    return (
	      <div className="page-inner splash-page">
	      	<div className="splash-tilt">
			  	<Card size="medium" type="splash-cards" className="--pointer">
					<div className="card-inner" onClick={this.enterCodeModal}>
						<h3>Enter Code</h3>
					</div>
				</Card>
				<Card size="medium" type="splash-cards" className="--pointer">
					<div className="card-inner f--start-app" onClick={this.initSession.bind(this)}>
						<h3>Start Session</h3>
					</div>
				</Card>
	      	</div>
	      	<div className={`splash-logo-wrapper ${showLogo ? '' : 'trans-hide'}`}>
	      		<div className="logo-typography">
	      			Quetzal
	      		</div>
	      	</div>
	      </div>
	    );
  	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SplashPage));
