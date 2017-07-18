import React, { Component } from 'react';
import { 
	Segment,
	Icon
} from 'semantic-ui-react'

import '../styles/core.css'

export default class Message extends Component {
	render() {
		var icon = ''
		if(this.props.icon) {
			icon = <Icon name={this.props.icon} />
		}
		return (
			<Segment basic className={'message-juspay'} padded>
				{icon}
				{this.props.message}
			</Segment>
		);
	}
}
