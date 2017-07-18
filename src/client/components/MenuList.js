import React, { Component } from 'react';
import {
	List,
	Icon
} from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import Message from '../components/Message'
import '../styles/MenuListView.css'

class ListItem extends Component {

	handleClick = (e) => {
		e.preventDefault();
		browserHistory.push(this.props.url)
	}

	render() {
		return (
			<List.Item className={'list-item'} onClick={this.handleClick}>
				<List.Icon name='chevron right' color='blue'/>
				<List.Content>
					{this.props.content}
				</List.Content>
			</List.Item>
			)
	}
}

export default class MenuList extends Component {
	render() {
		var listItems = []
		if(this.props.items) {
			this.props.items.forEach((item) => {
				listItems.push(<ListItem content={item.content} url={item.url}/>)
			})
		}
		return (
			<div>
				<List divided relaxed selection animated verticalAlign='middle' size='large'>
					{listItems}
					<List.Item disabled />
				</List>
			</div>
		);
	}
}
