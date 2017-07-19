import React, { Component } from 'react';
import { 
	Dimmer,
	Header,
	Icon,
	Image 
} from 'semantic-ui-react';

export default class JuspayLoader extends Component {
	render() {
		return (
			<Dimmer active={this.props.active}>
					<Header as='h3' icon color='yellow'>
						<Icon loading>
							<Image src='/static/juspay-logo-main-white.png' avatar shape='circular' size='tiny'/>
						</Icon>
						{this.props.message}
					</Header>
			</Dimmer>
		);
	}
}
