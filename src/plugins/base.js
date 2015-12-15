var mongoose = require('mongoose');

module.exports = function(schema, options) {
  schema.add({ created: { type: Date, default: Date.now } });
  schema.add({ modified: { type: Date, default: Date.now } });
  schema.add({ deleted: Date});
  schema.add({ deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } });

  schema.pre('save', function (next) {
    this.modified = new Date();
    if (!this.created)
      this.created = new Date();
    next();
  });
}
