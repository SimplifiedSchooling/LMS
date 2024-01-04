const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { recordedBroadcastService } = require('../services');

const createRecordedBroadcast = catchAsync(async (req, res) => {
  req.body.landscapeImage = await req.files.landscapeImage[0].path;
  req.body.portraitImage = await req.files.portraitImage[0].path;
  const newRecordedBroadcast = await recordedBroadcastService.createRecordedBroadcast(req.body);
  res.status(httpStatus.CREATED).send(newRecordedBroadcast);
});

const getAllRecordedBroadcast = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const allRecordedBroadcast = await recordedBroadcastService.getAllRecordedBroadcast(filter, options);
  res.send(allRecordedBroadcast);
});

const getRecordedBroadcastById = catchAsync(async (req, res) => {
  const singleRecordedBroadcast = await recordedBroadcastService.getRecordedBroadcastById(req.params.recordedBroadcastId);
  if (!singleRecordedBroadcast) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RecordedBroadcast not found');
  }
  res.send(singleRecordedBroadcast);
});

const updateRecordedBroadcastById = catchAsync(async (req, res) => {
  if (req.file) {
    req.body = req.file.landscapeImage;
    req.body = req.file.portraitImage;
  }
  const updatedRecordedBroadcast = await recordedBroadcastService.updateRecordedBroadcastById(
    req.params.recordedBroadcastId,
    req.body
  );
  res.send(updatedRecordedBroadcast);
});

const deleteRecordedBroadcastById = catchAsync(async (req, res) => {
  const deletedRecordedBroadcast = await recordedBroadcastService.deleteRecordedBroadcastById(
    req.params.recordedBroadcastId
  );
  res.status(httpStatus.NO_CONTENT).send(deletedRecordedBroadcast);
});

const getRecordedBroadcastByFilter = catchAsync(async (req, res) => {
  const { classId, subjectId } = req.params;
  const data = await recordedBroadcastService.getRecordedBroadcastByFilter(classId, subjectId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RecordedBroadcast data  not found');
  }
  res.send(data);
});

const getRecordedBroadcastsByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const chaptersData = await recordedBroadcastService.getRecordedBroadcastsByBookId(bookId);
  res.status(200).json({ chaptersData });
});

const getRecordedBroadcast = catchAsync(async (req, res) => {
  const { boardId, classId, subjectId, mediumId, chapterId, bookId } = req.params;

  const params = {
    boardId,
    classId,
    subjectId,
    mediumId,
    chapterId,
    bookId,
  };

  const recordedBroadcast = await recordedBroadcastService.getRecordedBroadcast(params);

  if (!recordedBroadcast) {
    return res.status(404).json({ message: 'No recorded broadcast found for the given parameters.' });
  }

  return res.json(recordedBroadcast);
});

module.exports = {
  createRecordedBroadcast,
  getAllRecordedBroadcast,
  getRecordedBroadcastById,
  updateRecordedBroadcastById,
  deleteRecordedBroadcastById,
  getRecordedBroadcastByFilter,
  getRecordedBroadcastsByBookId,
  getRecordedBroadcast,
};
