'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = {
	mongoose: mongoose,
	models: {
		User: require('./models/user'),
		Product: require('./models/product'),
		Transaction: require('./models/transaction'),
		Variant: require('./models/variant')
	}
};
