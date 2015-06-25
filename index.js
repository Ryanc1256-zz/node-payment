var request = require("superagent");
var url = require("url");
var querystring = require("querystring");
var _ = require("lodash");
var debug = require("debug")("subscribe");
var q = require("q");
var paypal = require("paypal-rest-sdk");

/**
 * Custom modules
 */
var models = require("./models/");
var subscription = require("./lib/subscription");

//where we store the made models
var collections = null;


var payment = function( credentials, opts ){
	var self = this;
	if ( !credentials.username ) throw new Error("Missing username");
	if ( !credentials.password ) throw new Error("Missing password");
	if ( !credentials.signature ) throw new Error("Missing signature");

	this.credentials = credentials;
	this.apiVersion = 94;

	paypal.configure({
		mode: "sandbox",
		client_id: "",
		client_secret: ""
	});



	return this;
}


payment.prototype.get = function( id ){
	//lets just get a transaction
	//lets subscribe a user
	var defer = q.defer();


	debug("Getting product on sale");
	getModels(function( models ){
		//create the models
		models.product.findOne( id ).then(function( product ){
			if ( product ){
				defer.resolve( product );
			} else {
				defer.reject( new Error("Failed to find a product") );
			}			
		}, function( err ){
			debug("reason for failing", err );
			defer.reject( new Error("Failed to find a product") );
		})
	});
	return defer.promise;
}

payment.prototype.has = function(){

}

payment.prototype.authenticate = function( callback ){
	var self = this;
	paypal.authorization.get("99M58264FG144833V", function ( err, authorization) {
	    if ( err ) {
	        callback( err );
	    } else {
	        callback( authorization );
	    }
	});
}



payment.prototype.purchase = function( product, user ){
	//lets purchase a product
	debug("purchasing %s with user %s", product.name, user.id );
}
	
payment.prototype.subscribe = function( product, opts ){
	//lets subscribe a user
	var defer = q.defer();
	//yay lets subscribe to a product 
	if ( !product.id ) {
		defer.reject(new Error("No product id found"));
	} else {
		//so now we have a product, lets just puchase it
		new subscription( product, opts).subscribe();
	}
	return defer.promise;
}

payment.prototype.sell =  function( product ){
	//lets subscribe a user
	var defer = q.defer();
	var defaults = {
		name: "",
		price: {
			value: 0,
			currency: "USD"
		},
		description: ""
	};

	product = _.extend( defaults, product );

	product.currency = defaults.price.currency;
	product.price = defaults.price.value;


	debug("Putting product on sale");
	getModels(function( models ){
		//create the models
		models.product.create( product ).then(function( product ){
			if ( product ){
				defer.resolve( product );
			} else {
				defer.reject( new Error("Failed to create product") );
			}			
		}, function( err ){
			debug("reason for failing", err );
			defer.reject( new Error("Failed to create product") );
		})
	});
	return defer.promise;
}

payment.prototype.cancel = function(){

}


function getModels ( cb ){
	if ( collections != null ){
		return cb( collections );
	} else {
		models(function( err, res ){
			if ( err ) throw new Error("Couldn't connect to db, reason - ", err );
			collections = res.collections;
			return cb( collections );
		});
	}
}

module.exports = payment;