import { handleActions } from 'redux-actions'
import {
	UPDATE_CARD_NUMBER,
	UPDATE_CARD_EXPIRY_MONTH,
	UPDATE_CARD_EXPIRY_YEAR,
	UPDATE_CARD_SECURITY_CODE,
	UPDATE_CARD_TOKEN,
	UPDATE_NAME_ON_CARD,
	UPDATE_STORED_CARDS,
	SHOW_LOADER,
	HIDE_LOADER,
	SET_ACTIVE_TAB
} from '../constants/ActionTypes'

const initialState = {
	storedCards : [],
	cardToken : '',
	cardNumber : '',
	cardExpiryMonth : '',
	cardExpiryYear : '',
	cardSecurityCode : '',
	nameOnCard : '',
	activeTab : 'saved_cards',
	loader : false
}

export default handleActions({
	[SET_ACTIVE_TAB] : (state, {payload}) => {
		return Object.assign({}, state, {activeTab : payload})
	},
	[UPDATE_CARD_NUMBER] : (state, {payload}) => {
		return Object.assign({}, state, {cardNumber : payload})
	},
	[UPDATE_CARD_TOKEN] : (state, {payload}) => {
		return Object.assign({}, state, {cardToken : payload})
	},
	[UPDATE_CARD_EXPIRY_MONTH] : (state, {payload}) => {
		return Object.assign({}, state, {cardExpiryMonth : payload})
	},
	[UPDATE_CARD_EXPIRY_YEAR] : (state, {payload}) => {
		return Object.assign({}, state, {cardExpiryYear : payload})
	},
	[UPDATE_CARD_SECURITY_CODE] : (state, {payload}) => {
		return Object.assign({}, state, {cardSecurityCode : payload})
	},
	[UPDATE_NAME_ON_CARD] : (state, {payload}) => {
		return Object.assign({}, state, {nameOnCard : payload})
	},
	[UPDATE_STORED_CARDS] : (state, {payload}) => {
		return Object.assign({}, state, {storedCards : payload})
	},
	[SHOW_LOADER] : (state) => {
		return Object.assign({}, state, {loader : true})
	},
	[HIDE_LOADER] : (state) =>{
		return Object.assign({}, state, {loader : false})
	}
}, initialState)