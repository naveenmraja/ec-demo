import React, { Component } from 'react';
import Message from '../components/Message'
import MenuList from '../components/MenuList'

export default class PaymentOptionsView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const items = [{
			content : 'PAY WITH API',
			url : '/orders/:orderId/api/paymentmethods'.replace(':orderId', this.props.routeParams.orderId)
		}, {
			content : 'PAY WITH IFRAME',
			url : '/orders/:orderId/ipay'.replace(':orderId', this.props.routeParams.orderId)
		}, {
			content : 'PAY WITH PAY-V3.JS',
			url : '/orders/:orderId/pay-v3/paymentmethods'.replace(':orderId', this.props.routeParams.orderId)
		}, {
			content : 'PAY WITH PAYMENT LINKS',
			url : '/orders/:orderId/paymentlinks'.replace(':orderId', this.props.routeParams.orderId)
		}]
		return (
			<div>
				<Message message='Please select one of the listed payment options' />
				<MenuList items={items} />
			</div>
		);
	}
}
