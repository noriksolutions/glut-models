'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let enumMediaTypes = {
  values: 'video image'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

let media = {
  url: String,
  width: Number,
  height: Number,
  mediaType: { type: String, enum: enumMediaTypes }
};

let productSchema = new mongoose.Schema({
  upc: { type: String, unique: true },
  sku: { type: String, unique: true },
  quantity: { type: Number, default: 0 },
  digital: { type: Boolean, default: false },
  downloadUrl: String,
  available: { type: Boolean, default: true },
  name: String,
  description: String,
  tags: [String],
  medias: [media],
  msrp: { type: Number, default: 0 },
  salePrice: { type: Number, default: 0 },
  wholesale: { type: Number, default: 0 },
  variants: mongoose.Schema.Types.Mixed,
  weight: {
    unit: { type: String },
    value: { type: Number, default: 0 }
  },
  dimensions: {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    length: { type: Number, default: 0 },
    unit: { type: String }
  }
});

productSchema.plugin(basePlugin);

productSchema.pre('save', function(next) {
  if (!this.upc)
    this.upc = mongoose.Types.ObjectId().toString();
  if (!this.sku)
    this.sku = mongoose.Types.ObjectId().toString();
  next();
});

module.exports = mongoose.model('Product', productSchema);
