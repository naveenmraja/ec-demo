import React, { Component } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/core.css'


export default class Layout extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='layout'>
				<Header />
				<div className='app'>
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}
