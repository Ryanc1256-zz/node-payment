var payment = require("../");
var assert = require("assert");
var should = require('should');

	payment = new payment({
		username: "test",
		password: "test",
		signature: "test"
	});

var productObj = {};
describe("Basic Listing", function(){
	describe("Sell (post)", function(){
		it("Should be able to see a product", function( done ){
			payment.sell({
				name: "test-product-1",
				price: {
					value: 300,
					currency: "USD"
				},
				description: "Just a test product"
			}).then( function( product ){
				product.should.have.property( "name" );
				product.should.have.property( "price" );
				product.should.have.property( "description" );
				product.should.have.property( "currency" );
				productObj = product;
				done();
			}).fail(function(err){
				done( err );
			});
		});
	});

	describe("Get", function(){
		it("Should be able to find the product", function( done ){
			payment.get( productObj.id ).then(function( product ){
				product.should.have.property( "name" );
				product.should.have.property( "price" );
				product.should.have.property( "description" );
				product.should.have.property( "currency" );
				done();
			}).fail(function( err ){
				done( err );
			});
		});
	});	
});



describe("Basic Subscription", function(){
	describe("Sell (post)", function(){
		it("We should be able to subscribe", function( done ){
			payment.subscribe(productObj, {
				returnUrl: "HTTP://google.com",
				cancelUrl: "HTTP://google.com/failed",
				frequency: "MONTH",
				paymentName: "REGULAR - 1"
			}).then( function( transaction ){
				console.log( transaction );
			}).fail(function(err){
				done( err );
			});
		});
	});	
});