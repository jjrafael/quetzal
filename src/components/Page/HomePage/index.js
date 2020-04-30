import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Footer from './footer';
// import ModalSettings from '../../modal/ModalSettings';

//misc
// import {
// 	makeId, 
// 	getNow, 
// 	setLocalStorage, 
// 	getAllLocalStorage,
// 	getResponse,
// 	deleteLocalStorage,
// 	pluralizeString,
// 	randomNumber, 
// 	generateColor,
// 	scrollTo
// } from '../../../utils';
// import avatars from '../../../config/avatars';

const mapStateToProps = state => {return {
	user: state.session.user,
	session: state.session.session,
}}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
	{
	  
	},
	dispatch
  )
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentWillUnmount() {
		this.unListenData('all');
	}
	
	render() {
		return (
		  <div className={`page-wrapper home-page`}>
				<div>
					List of apps here
				</div>
				<Footer/>
		  </div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
