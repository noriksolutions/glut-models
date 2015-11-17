'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let enumStatusTypes = {
	values: 'completed failed pending refunded'.split(' '),
	message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

let cartItem = {
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
	quantity: { type: Number, required: true },
	subtotal: { type: Number, required: true }
};

let transactionSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	cart: [cartItem],
	total: { type: Number, required: true },
	status: { type: String, enum: enumStatusTypes },
	transactionReferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

transactionSchema.plugin(basePlugin);

module.exports = mongoose.model('Transaction', transactionSchema);
