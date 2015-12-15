'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let enumStatusTypes = {
  values: 'paid failed pending refunded shipped'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

let address = {
  streets: [String],
  city: String,
  stateOrProvince: String,
  countryCode: String,
  postalCode: String
};

let contact = {
  firstName: String,
  lastName: String,
  email: String,
  phone: String
};

let actor = {
  address,
  contact
};

let cartItem = {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  price: { type: Number, required: true }
};

let transactionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  last4: String,
  exp: String,
  payer: actor,
  recipient: actor,
  cart: [cartItem],
  shippingMethod: String,
  shippingAmount: { type: Number, default: 0 },
  salesTax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: enumStatusTypes },
  paymentRefId: String
});

transactionSchema.plugin(basePlugin);

module.exports = mongoose.model('Transaction', transactionSchema);
