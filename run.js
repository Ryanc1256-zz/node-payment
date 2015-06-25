var payment = require("./index.js");
	payment = new payment({
		username: "test",
		password: "test",
		signature: "test"
	});


payment.sell({
	name: "test-product-1",
	price: {
		value: 300,
		currency: "USD"
	},
	description: "Just a test product"
}).then( function( product ){
	payment.subscribe(product, {
		returnUrl: "HTTP://google.com",
		cancelUrl: "HTTP://google.com/failed",
		frequency: "MONTH",
		paymentName: "REGULAR - 1"
	}).then( function( transaction ){
		console.log( transaction );
	}).fail(function(err){
		console.log( err );
	});
}).fail(function(err){
	console.log( err );
});

