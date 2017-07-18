import { handleActions } from 'redux-actions'
import {
	UPDATE_ORDER_ID,
	UPDATE_AMOUNT,
	UPDATE_CUSTOMER_ID,
	UPDATE_CUSTOMER_PHONE,
	UPDATE_CUSTOMER_EMAIL,
	UPDATE_INVALID_AMOUNT,
	CREATE_ORDER,
	ORDER_CREATE_SUCCESSFUL,
	ORDER_CREATE_FAILED
} from '../constants/ActionTypes'
import {
	SUCCESS,
	PENDING,
	FAILED,
	NEW,
	CREATING,
	INVALID
} from '../constants/Status'

const initialState = {
	orderId : '',
	amount : '',
	customerId : '',
	customerEmail : '',
	customerPhone : '',
	status : INVALID,
	invalidAmount : false,
	webUrl : '',
	mobileUrl : '',
	iframeUrl : ''
}

export default handleActions({
	[UPDATE_ORDER_ID] : (state, {payload}) => {
		return Object.assign({}, state, {orderId : payload})
	},
	[UPDATE_CUSTOMER_ID] : (state, {payload}) => {
		return Object.assign({}, state, {customerId : payload})
	},
	[UPDATE_AMOUNT] : (state, {payload}) => {
		return Object.assign({}, state, {amount : payload})
	},
	[UPDATE_CUSTOMER_EMAIL] : (state, {payload}) => {
		return Object.assign({}, state, {customerEmail : payload})
	},
	[UPDATE_CUSTOMER_PHONE] : (state, {payload}) => {
		return Object.assign({}, state, {customerPhone : payload})
	},
	[UPDATE_INVALID_AMOUNT] : (state) => {
		return Object.assign({}, state, {invalidAmount : true})
	},
	[CREATE_ORDER] : (state) => {
		return Object.assign({}, state, {status : CREATING, invalidAmount : false})
	},
	[ORDER_CREATE_SUCCESSFUL] : (state, {payload}) => {
		return Object.assign({}, state, {
			status : NEW, 
			orderId : payload.order_id, 
			webUrl : payload.payment_links.web, 
			mobileUrl : payload.payment_links.mobile, 
			iframeUrl : payload.payment_links.iframe
		})
	},
	[ORDER_CREATE_FAILED] : (state) => {
		return Object.assign({}, state, {status : INVALID})
	}
}, initialState)