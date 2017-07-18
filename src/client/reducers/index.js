import { combineReducers } from 'redux';
import orderDetails from './OrderDetails'
import cardDetails from './CardDetails'

const rootReducer = combineReducers({
  orderDetails,
  cardDetails
});

export default rootReducer;