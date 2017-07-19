import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/core.css'


const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId
})

class Layout extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='layout'>
				<Header location={this.props.location} orderId={this.props.orderId}/>
				<div className='app'>
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps)(Layout)