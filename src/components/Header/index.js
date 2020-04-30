import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import HeaderCenter from './HeaderCenter';
import Menu from './Menu';
import MobileHeader from './MobileHeader';

const mapStateToProps = state => {
  return {
    user: state.session.user,
    settings: state.session.settings,
  }
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
	  {},
	  dispatch
	)
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: false,
    }
  }

  toggleMenu(value) {
    this.setState({ isMenu: value });
  }

  render() {
    const { 
      className,
      headerProps,
      page
    } = this.props;
    const { isMenu } = this.state;
    
    return (
      <header className={`app-header ${className || ''}`}>
        <MobileHeader page={page} />
        <HeaderCenter
          className={isMenu ? '--open' : '--close'}>
          <Menu {...headerProps}/>
          <div className="menu__toggle">
            { !isMenu ?
              <i className="icon icon-menu"
                onClick={() => this.toggleMenu(true)}></i>
              : <i className="icon icon-clearclose"
                onClick={() => this.toggleMenu(false)}></i>
            }
          </div>
        </HeaderCenter>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
