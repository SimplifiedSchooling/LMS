const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRecordedBroadcast = {
  body: Joi.object().keys({
    boardId: Joi.string().required(),
    mediumId: Joi.string().required(),
    classId: Joi.string().required(),
    subjectId: Joi.string().required(),
    bookId: Joi.string().required(),
    chapterId: Joi.string().required(),
    studio: Joi.string().required(),
    liveStreamingPath: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    presenterName: Joi.string().required(),
  }),
};

const getRecordedBroadcast = {
  params: Joi.object().keys({
    recordedBroadcastId: Joi.string().custom(objectId),
  }),
};

const getAllRecordedBroadcasts = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateRecordedBroadcastById = {
  params: Joi.object().keys({
    recordedBroadcastId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    boardId: Joi.string(),
    mediumId: Joi.string(),
    classId: Joi.string(),
    subjectId: Joi.string(),
    bookId: Joi.string(),
    chapterId: Joi.string(),
    studio: Joi.string(),
    liveStreamingPath: Joi.string(),
    date: Joi.string(),
    time: Joi.string(),
    title: Joi.string(),
    type: Joi.string(),
    presenterName: Joi.string(),
  }),
};
const deleteRecordedBroadcastById = {
  params: Joi.object().keys({
    recordedBroadcastId: Joi.string().custom(objectId),
  }),
};

const getRecordedBroadcastByFilter = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId).required(),
    subjectId: Joi.string().custom(objectId).required(),
  }),
};

const paramsFilters = {
  boardId: Joi.required().custom(objectId),
  classId: Joi.required().custom(objectId),
  subjectId: Joi.required().custom(objectId),
  mediumId: Joi.required().custom(objectId),
  chapterId: Joi.required().custom(objectId),
  bookId: Joi.required().custom(objectId),
};
module.exports = {
  createRecordedBroadcast,
  getRecordedBroadcast,
  getAllRecordedBroadcasts,
  updateRecordedBroadcastById,
  deleteRecordedBroadcastById,
  getRecordedBroadcastByFilter,
  paramsFilters,
};
