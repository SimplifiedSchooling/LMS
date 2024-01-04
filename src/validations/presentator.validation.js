const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPresentator = {
  body: Joi.object().keys({
    presentatorName: Joi.string().required(),
    presentatorType: Joi.string().required(),
    presentatorBio: Joi.string().required(),
    file: Joi.string(),
  }),
};

const getPresentator = {
  params: Joi.object().keys({
    presentatorId: Joi.string().custom(objectId),
  }),
};

const getAllPresentator = {
  query: Joi.object().keys({
    presentatorName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// const updatePresentatorById = {
//   params: Joi.object().keys({
//     presentatorId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object().keys({
//     presentatorName: Joi.string(),
//     presentatorType: Joi.string(),
//     presentatorBio: Joi.string(),
//     file: Joi.string(),
//   }),
// };
const deletePresentatorById = {
  params: Joi.object().keys({
    presentatorId: Joi.string().custom(objectId),
  }),
};

const updatePresentatorById = {
  params: Joi.object().keys({
    presentatorId: Joi.required().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      presentatorName: Joi.string(),
      presentatorType: Joi.string(),
      presentatorBio: Joi.string(),
      file: Joi.string(),
    })
    .min(1),
};
module.exports = {
  createPresentator,
  getPresentator,
  getAllPresentator,
  updatePresentatorById,
  deletePresentatorById,
};
