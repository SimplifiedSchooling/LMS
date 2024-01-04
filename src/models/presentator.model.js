const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const presentatorSchema = mongoose.Schema(
  {
    presentatorName: {
      type: String,
    },
    presentatorType: {
      type: String,
    },
    presentatorBio: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
presentatorSchema.plugin(toJSON);
presentatorSchema.plugin(paginate);

const Presentator = mongoose.model('Presentator', presentatorSchema);

module.exports = Presentator;
