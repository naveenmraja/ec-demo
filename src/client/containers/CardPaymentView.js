import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	Menu, 
	Container,
	Card,
	Input,
	Message as SemanticMessage,
	Button,
	Dropdown,
	Icon,
	Image,
	Dimmer,
	Header,
	Segment
} from 'semantic-ui-react';
import { actions as actions } from '../actions/MainActions'
import Message from '../components/Message'
import JuspayLoader from '../components/JuspayLoader'
import '../styles/CardPaymentView.css'

class SavedCards extends Component {

	render() {
		var savedCardsList = []
		if(this.props.cards.length > 0) {
			this.props.cards.forEach((storedCard) => {
				storedCard = JSON.parse(storedCard)
				savedCardsList.push(
					<Card 
						fluid 
						as='a' 
						onClick={(e) => {
							this.props.setCardState('cardToken', storedCard.token)
							this.props.setCardState('cardSecurityCode', '')
						}} >
						<Card.Content 
							extra={this.props.cardToken != storedCard.token}>
							<Icon 
								name={storedCard.brand ? 'visa' : 'credit card alternative'} size='big'/>
							<span className='saved-card-desc'>
								{storedCard.number}
								<Input 
									className='saved-card-cvv' 
									disabled={this.props.cardToken != storedCard.token}
									autoFocus={this.props.cardToken == storedCard.token}
									focus={this.props.cardToken == storedCard.token} 
									placeholder='CVV' 
									type='password'
									maxLength='4'
									onChange={(e) => {
										this.props.setCardState('cardSecurityCode', e.target.value)
									}} />
							</span>
						</Card.Content>
					</Card>
				)
			})
			savedCardsList.push(
				<Button fluid primary content='Continue' onClick={this.props.handlePayment}/>
			)
		} else {
			savedCardsList.push(
				<Container fluid>
					<SemanticMessage negative icon>
						<Icon name='exclamation circle'/>
						<SemanticMessage.Content>
							<SemanticMessage.Header>
								No saved cards available for the customer.
							</SemanticMessage.Header>
							<p>Please proceed the payment with a new card.</p>
						</SemanticMessage.Content>
					</SemanticMessage>
				</Container>
			)
		}
		if(this.props.active && !this.props.loader) {
			return (
				<div className='card-container'>
					{savedCardsList}
				</div>
			)
		} else {
			return (
				<div className='card-container'></div>
			)
		}
	}
}

class NewCard extends Component {

	range (start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) { 
          return index + start;  
      })
    }

	render() {
		if(this.props.active && !this.props.loader) {
			var expiryMonthList = this.range(1,12).map((x) => {
	             return {
	             	text : x,
	             	value : x
	             }
	        })
	        var expiryYearList = this.range(2017,33).map((x) => {
	        	return {
	        		text : x,
	        		value : x
	        	}
	        })
			return (
                <div className='card-container'>
                  	<div className='input-block'>
                    	<input 
                    		autofocus 
                    		className='input-area' 
                    		type="tel" 
                    		maxLength="23" 
                    		value={this.props.cardDetails.cardNumber} 
                    		onChange={(e) => {
                    			e.preventDefault()
                    			var cardNumber = e.target.value.replace(/ /g, '');
								if (cardNumber.length > 0){
									cardNumber = cardNumber.match(new RegExp('.{1,4}', 'g')).join(' ');
								}
                    			this.props.setCardState('cardNumber', cardNumber)
                    		}} 
                    		required/>
                    	<div className='input-label'>Card Number</div>
                    	<Icon name='credit card alternative' size='big' className='card-icon'/>
                	</div>
	                <div className='month-year-class'>
		                <div className='card-container-label'>Expiry Date</div>
		                	<Dropdown 
		                		placeholder='MM' 
		                		className='expiry-dropdown' 
		                		selection 
		                		scrolling 
		                		compact
		                		options={expiryMonthList} />
		                	<Dropdown 
		                		placeholder='YYYY' 
		                		className='expiry-dropdown' 
		                		selection 
		                		scrolling 
		                		compact
		                		options={expiryYearList} />
		            </div>
		            <div className='cvv-class' >
	                    <input 
	                    	type="password" 
	                    	className='input-area' 
	                    	maxLength="4" 
	                    	name="cvv" 
	                    	onChange={(e)=>{
	                    		this.props.setCardState('cardSecurityCode', e.target.value)
	                    	}} 
	                    	required/>
	                    <div className='input-label'>CVV</div>
	                </div>
	                <div className='card-container-label'>
				   		<input type="checkbox" onChange = {(e) => {
				   			this.props.setCardState('saveToLocker',e.target.checked)
				   		}} /> Save card information
					</div>
	                <Button fluid primary content='Continue' onClick={this.props.handlePayment}/>
	            </div>
			)
		} else {
			return (
				<div className='card-container'></div>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	amount : state.orderDetails.amount,
	customerId : state.orderDetails.customerId,
	activeTab : state.cardDetails.activeTab,
	storedCards : state.cardDetails.storedCards,
	cardToken : state.cardDetails.cardToken,
	cardNumber : state.cardDetails.cardNumber,
	cardExpiryMonth : state.cardDetails.cardExpiryMonth,
	cardExpiryYear : state.cardDetails.cardExpiryYear,
	cardSecurityCode : state.cardDetails.cardSecurityCode,
	nameOnCard : state.cardDetails.nameOnCard,
	loader : state.cardDetails.loader
})

class CardPaymentView extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount = () => {
		this.props.getStoredCards(this.props.customerId)
	}

	handleClick = (view) => {
		this.props.setActiveTab(view)
	}

	setCardState = (key, value) => {
		console.log('setCardState - key : ', key,'value : ', value)
		switch(key) {
			case 'cardNumber' : 
				this.props.updateCardNumber(value);
				break;
			case 'cardExpiryMonth' : 
				this.props.updateCardExpiryMonth(value);
				break;
			case 'cardExpiryYear' : 
				this.props.updateCardExpiryYear(value);
				break;
			case 'cardSecurityCode' : 
				this.props.updateCardSecurityCode(value);
				break;
			case 'nameOnCard' : 
				this.props.updateNameOnCard(value);
				break;
			case 'cardToken' : 
				this.props.updateCardToken(value);
				break;
			default :
				return;
		}
	}

	handlePayment = (type) => {
		console.log('handlePayment - ',type)
	}

	render() {
		var cardDetails = {
			cardNumber : this.props.cardNumber,
			cardExpiryMonth : this.props.cardExpiryMonth,
			cardExpiryYear : this.props.cardExpiryYear,
			cardSecurityCode : this.props.cardSecurityCode,
			nameOnCard : this.props.nameOnCard
		}
		var tagline = 'Please enter your card details to proceed. Total amount payable: \u20b9 ' + this.props.amount
		return (
			<Dimmer.Dimmable as={Container} dimmed={this.props.loader} className='juspay-dimmer-loader'>
				<JuspayLoader 
					active={this.props.loader} 
					message='Fetching saved cards. Please wait...'/>
				<Message 
					message={tagline} />
				<Menu 
					pointing 
					secondary 
					fluid 
					widths={2} 
					color='blue'>
					<Menu.Item 
						name='Saved Cards' 
						active={this.props.activeTab != 'new_card'} 
						onClick={() => { this.handleClick('saved_cards') }} />
					<Menu.Item 
						name='New Card' 
						active={this.props.activeTab == 'new_card'} 
						onClick={() => { this.handleClick('new_card') }} />
				</Menu>
				<SavedCards 
					active={this.props.activeTab != 'new_card'} 
					cards={this.props.storedCards} 
					cardToken={this.props.cardToken} 
					handlePayment={this.handlePayment} 
					setCardState={this.setCardState}
					loader={this.props.loader} />
				<NewCard 
					active={this.props.activeTab == 'new_card'} 
					cardDetails={cardDetails} 
					handlePayment={this.handlePayment} 
					setCardState={this.setCardState}
					loader={this.props.loader} />
			</Dimmer.Dimmable>
		);
	}
}

export default connect(mapStateToProps, actions)(CardPaymentView)
