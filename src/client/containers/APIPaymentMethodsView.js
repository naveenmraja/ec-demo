import React, { Component } from 'react';
import Message from '../components/Message'
import MenuList from '../components/MenuList'

export default class APIPaymentMethodsView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const items = [{
			content : 'CREDIT/DEBIT CARD',
			url : '/orders/:orderId/api/pay/card'.replace(':orderId', this.props.routeParams.orderId)
		}, {
			content : 'NETBANKING',
			url : '/orders/:orderId/api/pay/netbanking'.replace(':orderId', this.props.routeParams.orderId)
		}, {
			content : 'WALLETS',
			url : '/orders/:orderId/api/pay/wallet'.replace(':orderId', this.props.routeParams.orderId)
		}]
		return (
			<div>
				<Message 
					message='Please select a payment method for the transaction' />
				<MenuList 
					items={items} />
			</div>
		);
	}
}
