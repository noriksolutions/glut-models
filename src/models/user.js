'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let address = {
  name: String,
  street1: String,
  street2: String,
  city: String,
  state: String,
  postalcode: String,
  notes: String
};

let profile = {
  profileId: { type: String, require: true },
  provider: { type: String, require: true }
};

let formOfPayment = {
  paymentId: { type: String, unique: true },
  paymentType: String,
  last4: String,
  expMonth: String,
  expYear: String
};

let userSchema = mongoose.Schema({
  invitation: String,
  profiles: [profile],
  shippingAddresses: [address],
  billingAddresses: [address],
  roles: [String],
  formsOfPayment: [formOfPayment]
});

userSchema.plugin(basePlugin);

module.exports = mongoose.model('User', userSchema);
