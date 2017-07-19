import request from 'superagent'
import { createAction } from 'redux-actions'
import {
	UPDATE_ORDER_ID,
	UPDATE_AMOUNT,
	UPDATE_CUSTOMER_ID,
	UPDATE_CUSTOMER_PHONE,
	UPDATE_CUSTOMER_EMAIL,
	UPDATE_INVALID_AMOUNT,
	CREATE_ORDER,
	ORDER_CREATE_SUCCESSFUL,
	ORDER_CREATE_FAILED,
	SET_ACTIVE_TAB,
	UPDATE_CARD_NUMBER,
	UPDATE_CARD_EXPIRY_MONTH,
	UPDATE_CARD_EXPIRY_YEAR,
	UPDATE_CARD_SECURITY_CODE,
	UPDATE_CARD_TOKEN,
	UPDATE_NAME_ON_CARD,
	GET_STORED_CARDS,
	UPDATE_STORED_CARDS,
	SHOW_LOADER,
	HIDE_LOADER
} from '../constants/ActionTypes'
import {
	SUCCESS,
	PENDING,
	FAILED,
	NEW,
	CREATING,
	INVALID
} from '../constants/Status'
import {
	GLOBAL_TIME_OUT,
	ORDER_CREATE_URL,
	LIST_CARDS_URL
} from '../constants/config'

const onUpdateOrderId = createAction(UPDATE_ORDER_ID, data => data)
const onUpdateAmount = createAction(UPDATE_AMOUNT, data => data)
const onUpdateCustomerId = createAction(UPDATE_CUSTOMER_ID, data => data)
const onUpdateCustomerPhone = createAction(UPDATE_CUSTOMER_PHONE, data => data)
const onUpdateCustomerEmail = createAction(UPDATE_CUSTOMER_PHONE, data => data)
const onUpdateInvalidAmount = createAction(UPDATE_INVALID_AMOUNT)
const onCreateOrder = createAction(CREATE_ORDER)
const onOrderCreateSuccessful = createAction(ORDER_CREATE_SUCCESSFUL, data => data)
const onOrderCreateFailed = createAction(ORDER_CREATE_FAILED)
const onSetActiveTab = createAction(SET_ACTIVE_TAB, data => data)
const onUpdateCardNumber = createAction(UPDATE_CARD_NUMBER, data => data)
const onUpdateCardToken = createAction(UPDATE_CARD_TOKEN, data => data)
const onUpdateCardExpiryMonth = createAction(UPDATE_CARD_EXPIRY_MONTH, data => data)
const onUpdateCardExpiryYear = createAction(UPDATE_CARD_EXPIRY_YEAR, data => data)
const onUpdateCardSecurityCode = createAction(UPDATE_CARD_SECURITY_CODE, data => data)
const onUpdateNameOnCard = createAction(UPDATE_NAME_ON_CARD, data => data)
const onUpdateStoredCards = createAction(UPDATE_STORED_CARDS, data => data)
const onShowLoader = createAction(SHOW_LOADER)
const onHideLoader = createAction(HIDE_LOADER)

const updateOrderId = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateOrderId(data))
	}
}

const updateAmount = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateAmount(data))
	}
}

const updateCustomerId = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerId(data))
	}
}

const updateCustomerPhone = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerPhone(data))
	}
}

const updateCustomerEmail = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerEmail(data))
	}
}

const updateInvalidAmount = () => {
	return function(dispatch, getState) {
		dispatch(onUpdateInvalidAmount())
	}
}

const createOrder = (data) => {
	return function(dispatch, getState) {
		dispatch(onCreateOrder())
		request.post(ORDER_CREATE_URL)
				.timeout(GLOBAL_TIME_OUT)
				.send(data)
				.end((err, res) => {
					if(err || res.status >= 400) {
						dispatch(onOrderCreateFailed())
					} else {
						var response = res.body
						if(response && response.status != 'SUCCESS') {
							dispatch(onOrderCreateSuccessful(response))
						} else {
							dispatch(onOrderCreateFailed())
						}
					}
				})
	}
}

const getStoredCards = (data) => {
	return function(dispatch, getState) {
		dispatch(onShowLoader())
		if(data) {
			request.get(LIST_CARDS_URL.replace(':customerId', data))
				.timeout(GLOBAL_TIME_OUT)
				.end((err, res) => {
					if(err || res.status >= 400) {
						dispatch(onHideLoader())
					} else {
						var response = res.body
						console.log('stored cards - ', response)
						dispatch(onUpdateStoredCards(response.cards))
						dispatch(onHideLoader())
					}
				})
		} else {
			dispatch(onUpdateStoredCards([]))
			dispatch(onHideLoader())
		}
	}
}

const setActiveTab = (data) => {
	return function(dispatch, getState) {
		dispatch(onSetActiveTab(data))
	}
}

const updateCardNumber = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardNumber(data))
	}
}

const updateCardToken = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardToken(data))
	}
}

const updateCardExpiryMonth = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardExpiryMonth(data))
	}
}

const updateCardExpiryYear = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardExpiryYear(data))
	}
}

const updateCardSecurityCode = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardSecurityCode(data))
	}
}

const updateNameOnCard = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateNameOnCard(data))
	}
}

const showLoader = () => {
	return function(dispatch, getState) {
		dispatch(onShowLoader())
	}
}

const hideLoader = () => {
	return function(dispatch, getState) {
		dispatch(onHideLoader())
	}
}

export const actions = {
	updateOrderId,
	updateAmount,
	updateCustomerId,
	updateCustomerPhone,
	updateCustomerEmail,
	updateInvalidAmount,
	createOrder,
	setActiveTab,
	updateCardNumber,
	updateCardToken,
	updateCardExpiryMonth,
	updateCardExpiryYear,
	updateCardSecurityCode,
	updateNameOnCard,
	getStoredCards,
	showLoader,
	hideLoader
}