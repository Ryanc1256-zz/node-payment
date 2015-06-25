var paypal = require("paypal-rest-sdk");
var _ = require("lodash");
var debug = require("debug")("subscribe:subscription");

var models = require("../models/");
var collections = null;



var transaction = function( product, user, status ){
	this.status = status;
	this.user = user;
	return this;
}


transaction.prototype.create = function(){
	var self = this;
	getModels(function( models ){
		models.transaction.create({
			status: "NOT-COMPLETE",
			user: self.user.id,
			product: product.id,
		}).then(function( transaction ){
			if ( transaction ){
				//so we have created a transaction
			} else {

			}
		});
	})
}



function get(){
	getModels(function( models ){
		models.transaction.create({
			status: "NOT-COMPLETE",
			user: 1,
			product: 0
		});
	})
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




module.exports = transaction;

