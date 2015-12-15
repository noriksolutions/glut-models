'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let invitationSchema = new mongoose.Schema({
	email: String,
	phone: String,
	type: String,
	invitationId: { type: String, unique: true },
	successRedirect: String,
	errorRedirect: String,
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
