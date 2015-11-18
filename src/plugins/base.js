var mongoose = require('mongoose');

module.exports = function(schema, options) {
  schema.add({ createdAt: { type: Date, default: Date.now } });
  schema.add({ updatedAt: { type: Date, default: Date.now } });
  schema.add({ deletedAt: Date});
  schema.add({ deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } });

  schema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });
}
