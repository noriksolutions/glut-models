'use strict';

/*
This is used to store a grouping of allowed values for a given variant.
*/

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let variantSchema = new mongoose.Schema({
	name: { type: String, unique: true },
	type: String,
	values: [mongoose.Schema.types.Mixed]
});

variantSchema.plugin(basePlugin);

module.export = mongoose.model('Variant', variantSchema);
