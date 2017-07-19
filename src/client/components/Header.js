import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { 
	Segment,
	Header as SemanticHeader,
	Label,
	Icon,
	Image,
	Card
} from 'semantic-ui-react';
import '../styles/core.css'

const showBackButton = [
	"/paymentoptions",
	"/api/paymentmethods",
	"/api/pay/card", 
	"/api/pay/netbanking", 
	"/api/pay/wallet"
]

const backUrlMap = {
	"/paymentoptions" : "/",
	"/api/paymentmethods" : "/orders/:orderId/paymentoptions",
	"/api/pay/card" : "/orders/:orderId/api/paymentmethods",
	"/api/pay/netbanking" : "/orders/:orderId/api/paymentmethods",
	"/api/pay/wallet" : "/orders/:orderId/api/paymentmethods"
}

export default class Header extends Component {
	constructor(props) {
		super(props)
	}

	handleClick = (e) => {
		e.preventDefault();
		browserHistory.push('/')
	}

	render() {
		var currentPath = this.props.location.pathname
		var show = false
		for (var i = 0; i< showBackButton.length; i++) {
	      if (currentPath.indexOf(showBackButton[i]) > -1) {
	      	currentPath = showBackButton[i];
	        show = true;
	        break;
	      }
	    }
	    var orderId = this.props.orderId
	    var newUrl = currentPath
	    if(show) {
	    	newUrl = backUrlMap[currentPath].replace(':orderId', orderId)
	    }
		return (
			<Segment clearing basic className={'header-footer-main primary-color'} size='small'>
				<SemanticHeader as='a' onClick={this.handleClick} className={'header-element'}>
					<Image src='/static/juspay-logo-main-white.png' avatar shape='circular' spaced='right' />
					<span>Express Checkout</span>
				</SemanticHeader>
				<SemanticHeader 
					floated='right' 
					className={'header-element'} 
					hidden={!show}
					onClick={(e) => {
						e.preventDefault()
						if(show) {
							browserHistory.push(newUrl)
						}
					}}>
					<Label color='black' as='a'>
						<Icon name='arrow left' />
					</Label>
				</SemanticHeader>
			</Segment>
		);
	}
}
