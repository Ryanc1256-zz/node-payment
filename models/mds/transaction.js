/**
 * Just the product 
 * @type {Object}
 */
module.exports = {
    tableName: "transactions",
    connection: "mysql",
    attributes: {
    	id: {
    		type: "int",
    		autoIncrement: true,
    		primaryKey: true
    	},
    	user: {
            type: "int",
            required: true
        },
    	product: {
            model: "product",
            required: true
        },
        transactionID: {
            type: "STRING"
        },
        status: {
            type: "string",
            enum: ["FAILED", "COMPLETE", "NOT-COMPLETE", "REJECTED"]
        }
    }
};