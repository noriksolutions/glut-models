'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let invitationSchema = new mongoose.Schema({
	email: String,
	phone: String,
	type: String,
	invitationId: { type: String, unique: true, required: true },
	successRedirect: { type: String, required: true },
	errorRedirect: { type: String, required: true },
	redeemed: Date,
	sent: Date,
	expires: Date,
	roles: [String]
});

invitationSchema.pre('save', function(next) {
  if (!this.invitationId)
    this.invitationId = mongoose.Types.ObjectId().toString();
  next();
});

invitationSchema.plugin(basePlugin);

module.exports = mongoose.model('Invitation', invitationSchema);
