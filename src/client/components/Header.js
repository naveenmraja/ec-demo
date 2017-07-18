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

export default class Header extends Component {
	constructor(props) {
		super(props)
	}

	handleClick = (e) => {
		e.preventDefault();
		browserHistory.push('/')
	}

	render() {
		return (
			<Segment clearing basic className={'header-footer-main primary-color'} size='small'>
				<SemanticHeader as='a' onClick={this.handleClick} className={'header-element'}>
					<Image src='/static/juspay-logo-main-white.png' avatar shape='circular' spaced='right' />
					<span>Express Checkout</span>
				</SemanticHeader>
				<SemanticHeader floated='right' className={'header-element'}>
					<Label color='black' as='a'>
						<Icon name='arrow left' />
					</Label>
				</SemanticHeader>
			</Segment>
		);
	}
}
