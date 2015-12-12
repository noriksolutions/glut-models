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
  customerId: String,
  paymentId: String,
  gateway: String,
  paymentType: String,
  last4: String,
  expMonth: String,
  expYear: String
};

let userSchema = mongoose.Schema({
  invitation: String,
  primaryEmail: String,
  profiles: [profile],
  shippingAddresses: [address],
  billingAddresses: [address],
  roles: [String],
  formsOfPayment: [formOfPayment]
});

userSchema.methods.isAdmin = function() {
  return (_.get(this, 'roles', []).indexOf('admin') > -1);
};

userSchema.plugin(basePlugin);

module.exports = mongoose.model('User', userSchema);
