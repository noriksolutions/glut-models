'use strict';

let mongoose = require('mongoose');
let basePlugin = require('../plugins/base');

let profile = {
  profileId: { type: String, require: true },
  provider: { type: String, require: true }
};

let userSchema = mongoose.Schema({
  invitation: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' },
  email: String,
  profiles: [profile],
  roles: [String],
});

userSchema.methods.isAdmin = function() {
  return (_.get(this, 'roles', []).indexOf('admin') > -1);
};

userSchema.plugin(basePlugin);

module.exports = mongoose.model('User', userSchema);
