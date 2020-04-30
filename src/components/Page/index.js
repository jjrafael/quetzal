import React from 'react';

//pages
import SplashPage from './SplashPage';
import HomePage from './HomePage';

// misc
import { variables } from '../../config';

class Page extends React.Component {
    renderPage() {
		const { hasModals, page } = this.props;
		const generalProps = { variables, hasModals };
		let html = null;
		const props = {
			general: generalProps,
			home: generalProps
		}
		
		if(page === 'splash'){
			html = <SplashPage {...props.general} />
		}else if(page === 'home'){
			html = <HomePage {...props.home} />
		}else if(page === 'error'){
			html = <SplashPage {...props.general} />
		}else{
			html = <SplashPage {...props.general} />
		}

		return html;
    }
    
    render() {
        return (
        <div className={`page-wrapper`}>
            {this.renderPage()}
        </div>
        );
    }
}

export default Page;