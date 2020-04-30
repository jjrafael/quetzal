import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import { 
	toggleSignOutModal,
	toggleEnterCodeModal,
	toggleAboutDevModal
} from '../../actions/session';

//misc
import menu from '../../config/menu';

const mapStateToProps = state => {return {
	user: state.session.user,
}}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
    	toggleSignOutModal, 
		toggleEnterCodeModal,
		toggleAboutDevModal,
    },
    dispatch
  )
}

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuData: menu.splashMenu || [],
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isSessionReady !== this.props.isSessionReady){
			this.updateMenu();
		}
	}

	startSession(){
		const el = document.getElementsByClassName('f--start-app');
		if(el.length){
			el[0].click();
		}
	}

	updateMenu(){
		const { isSessionReady } = this.props;
		let menuData = menu.aboutMenu;
		
		if(isSessionReady){
			//user already logged, app is initialized
			menuData = menu.homeMenu
		}else{
			//no user logged and/or app wasn't initialized yet
			menuData = menu.splashMenu
		}
		
		this.setState({menuData});
}

	clickMenu(data) {
		switch(data.id) {
			//modal
			case 'sign_out':
				this.props.toggleSignOutModal(true);
			break;
			case 'enter_code':
				this.props.toggleEnterCodeModal(true);
			break;
			case 'about_dev':
				this.props.toggleAboutDevModal(true);
			break;

			//func
			case 'start_session':
				this.startSession();
			break;
			default:
			break;
		}
	}

	renderMenuItems() {
		const { menuData } = this.state;
		let html = [];
		
		menuData.forEach((d, i) => {
			html.push(
				<li key={i} className={`menu__item ${d.className || ''}`}
					onClick={() => this.clickMenu(d)}>
					{d.label}
				</li>
			)
		})
		
		return html;
	}


 	render() {
    return (
      <div className="menu__wrapper group">
        <ul className="menu">
        	{this.renderMenuItems()}
        </ul>
      </div>
    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);