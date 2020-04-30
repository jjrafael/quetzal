import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import Card from './common/Card';
import CardsCol from './common/CardsCol';

//actions
import {
	initializeSession,
	toggleEnterCodeModal, 
	toggleWarningModal,
} from '../actions/session';

//misc
import { getNow, setLocalStorage } from '../utils';

const mapStateToProps = state => {
	return {
		deviceDetails: state.session.deviceDetails,
		user: state.session.user,
		userType: state.session.userType,
		settings: state.session.settings,
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
      toggleHowToPlayModal
    },
    dispatch
  )
}

class SplashPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loadingTitle: 'Initializing Session...',
			disableRouletteFx: false,
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
		this.props.toggleHowToPlayModal(true);
	}

	initSession(user) {
		const { settings } = this.props;
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
		const { loadingOverlay, deviceDetails, hasModals } = this.props;
		const { disableRouletteFx } = this.state;
		const isMobile = deviceDetails.device === 'mobile';
		const rouletteConds = !isMobile && !hasModals && !loadingOverlay && !disableRouletteFx;
		const showLogo = !loadingOverlay;
		const cardCount = 20;

	    return (
	      <div className="page-wrapper splash-page">
	      	<div className="splash-tilt">
	      		<CardsCol count={cardCount} animDelay={'15s'} className={`${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards"/>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'20s'} className={`${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards"/>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'9s'} className={`flippy ${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards" className="--pointer">
	      				<div className="card-inner" onClick={this.enterCodeModal}>
	      					<h3>Enter Code</h3>
	      				</div>
	      			</Card>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'17s'} className={`flippy ${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards" className="--pointer">
	      				<div className="card-inner f--start-app" onClick={this.initSession}>
	      					<h3>Start Session</h3>
	      				</div>
	      			</Card>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'5s'} className={`${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards"/>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'25s'} className={`${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards"/>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'7s'} className={`${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards"/>
	      		</CardsCol>
	      		<CardsCol count={cardCount} animDelay={'20s'} className={`${rouletteConds ? '--roulette' : ''}`}>
	      			<Card size="medium" type="splash-cards"/>
	      		</CardsCol>
	      	</div>
	      	<div className={`splash-logo-wrapper ${showLogo ? '' : 'trans-hide'}`}>
	      		<div className="logo-typography">
	      			<span>T</span>
	      			<span>Y</span>
	      			<span>R</span>
	      		</div>
	      	</div>
	      </div>
	    );
  	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SplashPage));
