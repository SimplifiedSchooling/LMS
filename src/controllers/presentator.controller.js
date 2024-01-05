const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { presentatorService } = require('../services');
const { filterPath } = require('../utils/s3middleware');

const createPresentator = catchAsync(async (req, res) => {
  const { file } = req;
  req.body.photo = await filterPath(file.location);
  const newStudio = await presentatorService.createPresentator(req.body);
  res.status(httpStatus.CREATED).send(newStudio);
});

const getAllPresentator = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['presentatorName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const allStudios = await presentatorService.getAllPresentator(filter, options);
  res.send(allStudios);
});

const getPresentator = catchAsync(async (req, res) => {
  const singleStudio = await presentatorService.getPresentatorById(req.params.presentatorId);
  if (!singleStudio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Presenter not found');
  }
  res.send(singleStudio);
});

const updatePresentator = catchAsync(async (req, res) => {
  const { file } = req;
  if (file) {
    req.body.photo = await filterPath(file.location);
  }
  const updatedStudio = await presentatorService.updatePresentatorById(req.params.presentatorId, req.body);
  res.send(updatedStudio);
});

const deletePresentator = catchAsync(async (req, res) => {
  const deletedStudio = await presentatorService.deletePresentatorById(req.params.presentatorId);
  res.send(deletedStudio);
});

module.exports = {
  createPresentator,
  getAllPresentator,
  getPresentator,
  updatePresentator,
  deletePresentator,
};
