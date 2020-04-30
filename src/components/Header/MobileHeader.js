import React from 'react';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
  }
}

class MobileHeader extends React.Component {
	renderHeader() {
		return 'Howdy!';
	}

  render() {
  	const { page } = this.props;
    return (
      <div className={`mobile-header page-${page}`}>
        {this.renderHeader()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MobileHeader);