var paypal = require("paypal-rest-sdk");
var _ = require("lodash");
var debug = require("debug")("subscribe:subscription");

//custom modules
var models = require("../models/");
var Transaction = require("./transaction");




var subscription = function(product, opts) {
    this.product = product;
    //so now we have the product lets just boot create a new subscription
    this.transaction = new Transaction(product, {
        id: 1
    }, "NOT-COMPLETE");

    paypal.configure({
		mode: "sandbox",
		client_id: "",
		client_secret: ""
	});

    if (!opts.return_url && !opts.returnUrl) throw new Error("No return url present");
    if (!opts.cancel_url && !opts.cancelUrl) throw new Error("No cancel url present");
    if (!product.description) throw new Error("No Description present");
    if (!product.name) throw new Error("No Name present");

    if (!opts.frequency) throw new Error("No frequency present");
    if (!opts.paymentName) throw new Error("No Payment name present");


    this.subscriptionOpts = {
        description: product.description,
        merchant_preferences: {
            "cancel_url": opts.cancel_url || opts.cancelUrl,
            "initial_fail_amount_action": "continue",
            "max_fail_attempts": "1",
            "return_url": opts.return_url || opts.returnUrl
        },
        name: product.name,
        payment_definitions: [{
            amount: {
                currency: product.currency || "USD",
                value: product.price || "0"
            },
            cycles: 0,
            frequency: opts.frequency || "MONTH",
            frequency_interval: "1",
            name: opts.paymentName || "REGULAR",
            type: "REGULAR"
        }],
        type: "INFINITE"
    }  
}


subscription.prototype.cancel = function() {}

/**
 *
 * @method subscribe
 * @return {[type]} [description]
 */
subscription.prototype.subscribe = function() {
	paypal.billingPlan.create(  this.subscriptionOpts, function( err, response ){
		if ( err ) throw new Error( err );

		
		console.log( err, response );
	});
}



module.exports = subscription;