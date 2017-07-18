import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index'

import Layout from '../containers/Layout'
import HomeView from '../containers/HomeView'
import PaymentOptionsView from '../containers/PaymentOptionsView'
import APIPaymentMethodsView from '../containers/APIPaymentMethodsView'
import CardPaymentView from '../containers/CardPaymentView'
import NetBankingPaymentView from '../containers/NetBankingPaymentView'
import WalletPaymentView from '../containers/WalletPaymentView'

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
)

var routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Layout}>
				<IndexRoute component={HomeView} />
				<Route path='/orders/:orderId/paymentoptions' component={PaymentOptionsView}/>
				<Route path='/orders/:orderId/api/paymentmethods' component={APIPaymentMethodsView} />
				<Route path='/orders/:orderId/api/pay/card' component={CardPaymentView} />
				<Route path='/orders/:orderId/api/pay/netbanking' component={NetBankingPaymentView} />
				<Route path='/orders/:orderId/api/pay/wallet' component={WalletPaymentView}/>
				<Route path='*' component={HomeView} />
			</Route>
		</Router>
	</Provider>
);

module.exports = routes;