from flask import Flask, render_template, request, redirect, Response
import os
import json
import juspay as juspay
import JuspayConfig
import random
import time

app = Flask(__name__)
app.config['DEBUG'] = True

juspay.environment = JuspayConfig.environment
juspay.api_key = JuspayConfig.api_key

merchant_id = JuspayConfig.merchant_id
return_url = JuspayConfig.return_url

def generateRandomReferenceId(prefix) :
	return prefix + str(random.randint(1000000,9999999))

def isAvailable(param) :
	if param and param is not None :
		return True
	else :
		return False

@app.route("/",defaults={'path': ''})
@app.route('/<path:path>')
def home(path) :
	return render_template('index.html')

@app.route("/orders/create", methods = ["POST"])
def create_order() :
	amount = request.json.get('amount')
	order_id = generateRandomReferenceId('EC_DEMOAPP_')
	customer_id = generateRandomReferenceId('EC_DEMOAPP_')
	customer_phone = ''
	customer_email = ''
	if isAvailable(request.json.get('order_id')) :
		order_id = request.json.get('order_id')
	if isAvailable(request.json.get('customer_id')) :
		customer_id = request.json.get('customer_id')
	if isAvailable(request.json.get('customer_phone')) : 
		customer_phone = request.json.get('customer_phone')
	try :
		params = {
		'order_id' : order_id,
		'amount' : float(amount),
		'customer_id' : customer_id,
		'customer_phone' : customer_phone,
		'customer_email' : customer_email,
		'return_url' : return_url
		}
		order = juspay.Orders.create(**params)
		print vars(order)
		resp = {
		'order_id' : order.order_id,
		'status' : order.status,
		'payment_links' : vars(order.payment_links)
		}
		return Response(json.dumps(resp), mimetype='application/json')
	except Exception as e :
		print e
		return Response(json.dumps({'error' : 'Error while creating order'}), mimetype='application/json')

@app.route("/customers/<customer_id>/cards", methods = ["GET"])
def get_stored_cards(customer_id) :
	try :
		cards = juspay.Cards.list(customer_id=customer_id)
		cards = map(lambda card : json.dumps(vars(card)), cards)
		print cards
		return Response(json.dumps({'customer_id' : customer_id, 'cards' : cards}), mimetype='application/json')
	except Exception as e :
		print e
		return Response(json.dumps({'error' : 'Error while getting stored cards'}), mimetype='application/json')

port = int(os.environ.get('PORT', 5000))
if __name__ == "__main__" :
    app.run(port=port)