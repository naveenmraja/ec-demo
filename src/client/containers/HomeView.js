import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	Button
} from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import {
	CREATING,
	NEW,
	INVALID
} from '../constants/Status'
import { 
	actions as actions 
} from '../actions/MainActions'
import Message from '../components/Message'
import '../styles/HomeView.css'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	customerId : state.orderDetails.customerId,
	amount : state.orderDetails.amount,
	customerPhone : state.orderDetails.customerPhone,
	customerEmail : state.orderDetails.customerEmail,
	status : state.orderDetails.status,
	invalidAmount : state.orderDetails.invalidAmount
})

class HomeView extends Component {

	constructor(props) {
		super(props)
	}

	handleOrderIdChange = (e) => {
		e.preventDefault()
		this.props.updateOrderId(e.target.value)
	}

	handleCustomerIdChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerId(e.target.value)
	}

	handleAmountChange = (e) => {
		e.preventDefault()
		this.props.updateAmount(e.target.value)
	}

	handleEmailChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerEmail(e.target.value)
	}

	handlePhoneChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerPhone(e.target.value)
	}

	handleClick = (e) => {
		e.preventDefault();
		if(!this.props.amount || isNaN(this.props.amount)) {
			this.props.updateInvalidAmount()
		} else {
			var params = {
				'order_id' : this.props.orderId,
				'customer_id' : this.props.customerId,
				'amount' : this.props.amount,
				'customer_phone' : this.props.customerPhone,
				'customer_email' : this.props.customerEmail
			}
			this.props.createOrder(params)
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.status == CREATING && this.props.status == NEW) {
			var url = '/orders/' + this.props.orderId + '/paymentoptions'
			browserHistory.push(url)
		}
	}

	render() {
		var invalidAmountMessage = ''
		if(this.props.invalidAmount) {
			invalidAmountMessage = 'Error occured ! Please enter a valid amount'
		}
		return (
			<div>
				<Message 
					message="Welcome to Juspay's EC demo ! Please create your order." 
					icon='smile'/>
				<p className='param-rule'>
					<b> {invalidAmountMessage} </b>
				</p>
				<div className='input-block'>
					<input 
						autoFocus 
						required 
						type="text" 
						className='input-area' 
						value={this.props.orderId} 
						onChange={this.handleOrderIdChange} />
					<div className="input-label">Order ID</div>
				</div>
				<div className='input-block'>
					<input 
						required 
						type="text" 
						className='input-area' 
						value={this.props.amount} 
						onChange={this.handleAmountChange} />
					<div className="input-label">Amount *</div>
				</div>
				<div className='input-block'>
					<input 
						required 
						type="tel" 
						className='input-area' 
						value={this.props.customerPhone} 
						onChange={this.handlePhoneChange} />
					<div className="input-label">Phone Number</div>
				</div>
				<div className='input-block'>
					<input 
						required 
						type="text" 
						className='input-area' 
						value={this.props.customerEmail} 
						onChange={this.handleEmailChange} />
					<div className="input-label">Email</div>
				</div>
				<div className='input-block'>
					<input 
						required 
						type="text" 
						className='input-area' 
						value={this.props.customerId} 
						onChange={this.handleCustomerIdChange} />
					<div className="input-label">Customer ID</div>
				</div>
				<p className='param-rule'><b>* Mandatory fields</b></p>
				<Button 
					fluid 
					primary 
					content='Continue' 
					icon='right arrow' 
					labelPosition='right' 
					loading={this.props.status == CREATING} 
					disabled={this.props.status != INVALID} 
					onClick={this.handleClick} />
			</div>
		);
	}
}

export default connect(mapStateToProps, actions)(HomeView)
