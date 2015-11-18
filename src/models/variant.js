'use strict';

/*
This is used to store a grouping of allowed values for a given variant.
*/

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let variantSchema = new mongoose.Schema({
	name: { type: String, unique: true },
	type: String,
	values: [mongoose.Schema.Types.Mixed]
});

variantSchema.plugin(basePlugin);

module.exports = mongoose.model('Variant', variantSchema);
