import React, { Component } from 'react'
import { 
	Segment,
	Icon
} from 'semantic-ui-react'

import '../styles/core.css'

export default class Footer extends Component {

	handleClick = (e) => {
		e.preventDefault()
		var win = window.open('https://juspay.in/docs/advanced/ec/', '_blank')
		win.focus()
	}

	render() {
		return (
			<Segment.Group horizontal className={'header-footer-main'}>
				<Segment attached='bottom' clearing className={'header-footer-main primary-color'} textAlign='center'>
					<Icon name='call' size='large'/>
					<span>Call us at 080-40959660</span>
				</Segment>
				<Segment attached='bottom'clearing className={'header-footer-main footer-element'} 
					basic textAlign='center' onClick={this.handleClick}>
					<Icon name='file code outline' size='large'/>
					<span> Documentation</span>
				</Segment>
			</Segment.Group>
		);
	}
}
