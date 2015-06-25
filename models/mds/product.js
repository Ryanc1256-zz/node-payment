/**
 * Just the product 
 * @type {Object}
 */
module.exports = {
    tableName: "products",
    connection: "mysql",
    attributes: {
    	id: {
    		type: "int",
    		autoIncrement: true,
    		primaryKey: true
    	},
    	price: {
    		type: "float",
    		required: true
    	},
        currency: {
            type: "STRING",
            defaultsTo: "USD"
        },
    	name: {
    		type: "string",
    		required: true
    	},
    	description: {
    		type: "string",
    		required: true
    	}
    }
};