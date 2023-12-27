const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const leavingCertSchema = mongoose.Schema(
  {
    apllyedName: {
      type: String,
      trim: true,
      required: true,
    },
    StudentId: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
leavingCertSchema.plugin(toJSON);
leavingCertSchema.plugin(paginate);

const LeavingCert = mongoose.model('LeavingCert', leavingCertSchema);

module.exports = LeavingCert;
