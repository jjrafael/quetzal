import React from 'react';

class Card extends React.Component {
  renderSneaks(data) {
    const len = 3;
    const cardsMore = data.length - len;
    const sneackItems = data.slice(0, len);
    let html = [];

    if(data && sneackItems){
      sneackItems.forEach((d, i) => {
        html.push(<li key={i}>{d.text},</li>)
      })

      if(cardsMore){
        html.push(<li key="etc" className="more">+{cardsMore} more</li>)
      }
    }

    return <ul className="sneak-items">{html}</ul>
  }

  renderCardBack(element) {
    const { backChildren } = this.props;
    return element || backChildren || <div className="card-back__emblem">A</div>
  }

  render() {
  	const { className, type, size, children, backChildren, flipOver } = this.props;
    const cx = {
      size: size ? `card-${size}` : 'card-reg',
      card: className || '',
      type: type || '',
      flip: flipOver ? '--flipover' : ''
    }
  	let html = null;
    
  	switch(type){
  		case 'splash-cards':
  			html = <div className={`card ${cx.size} ${cx.card} ${cx.type} ${cx.flip}`}>
          <div className="card-front">{children}</div>
          <div className="card-back">{this.renderCardBack()}</div>
  			</div>
  		break;
  		default:
  			html = <div className={`card ${cx.size} ${cx.card} ${cx.type} ${cx.flip}`}>
          <div className="card-front">{children}</div>
          <div className="card-back">{backChildren}</div>
        </div>
  		break;
  	}

    return html;
  }
}

export default Card;
