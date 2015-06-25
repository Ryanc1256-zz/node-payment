var Waterline = require("waterline");
var _ = require("lodash");

/**
 * Will handle all the waterline loading
 */

var mysql = require("sails-mysql");
var list = require("./list");

var adapters = {
	mysql: mysql
}


module.exports = function( cb ){	
	_.each(adapters, function (def, identity) {
		// Make sure our adapter defs have `identity` properties
		def.identity = def.identity || identity;
	});



	var extendedCollections = [];
	_.each(list, function (def, identity) {
		// Make sure our collection defs have `identity` properties
		def.identity = def.identity || identity;

		// Fold object of collection definitions into an array
		// of extended Waterline collections.
		extendedCollections.push(Waterline.Collection.extend(def));
	});


	// Instantiate Waterline and load the already-extended
	// Waterline collections.
	var waterline = new Waterline();
	extendedCollections.forEach(function (collection) {
		waterline.loadCollection(collection);
	});

	// Initialize Waterline
	waterline.initialize({
		adapters: adapters,
		connections:  {
	        mysql: {
	            adapter: 'mysql',
	            host: 'localhost',
	            database: 'gamefroot',
	            user: "root"
	        }
        },    
		defaults: {
			migration: "drop"
		}
	}, cb);

	return waterline;
}
