const express = require('express');
const validate = require('../../middlewares/validate');
const presentatorValidation = require('../../validations/presentator.validation');
const presentatorController = require('../../controllers/presentator.controller');
const { createS3Middleware } = require('../../utils/s3middleware');

const router = express.Router();
router
  .route('/')
  .post(
    createS3Middleware('lmscontent'),
    validate(presentatorValidation.createPresentator),
    presentatorController.createPresentator
  )
  .get(validate(presentatorValidation.getAllPresentator), presentatorController.getAllPresentator);

router
  .route('/:presentatorId')
  .get(validate(presentatorValidation.getPresentator), presentatorController.getPresentator)
  .patch(
    createS3Middleware('lmscontent'),
    validate(presentatorValidation.updatePresentatorById),
    presentatorController.updatePresentator
  )
  .delete(validate(presentatorValidation.deletePresentatorById), presentatorController.deletePresentator);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Presentator
 *   description:   Presentator Management System
 */

/**
 * @swagger
 * /presentator:
 *   post:
 *     summary: Create a new presentator
 *     tags: [Presentator]
 *     requestBody:
 *       description: Presentator object to be created
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               presentatorName:
 *                 type: string
 *               file:
 *                 type: file
 *                 format: binary
 *               presentatorType:
 *                 type: string
 *               presentatorBio:
 *                 type: string
 *             example:
 *               presentatorName: Amit Mishra
 *               presentatorType: Teacher , Director
 *               presentatorBio: English , Hindi
 *               file: e892f517-c5a4-4b04-b62c-1054ca09e61c32580.jpg
 *     responses:
 *       200:
 *         description: Presentator created successfully
 *
 *   get:
 *     summary: Get all presentators
 *     tags: [Presentator]
 *     parameters:
 *       - in: query
 *         name: presentatorName
 *         schema:
 *           type: string
 *         description: presentator name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of presentators
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PresentatorInput'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * /presentator/{presentatorId}:
 *   patch:
 *     summary: Update a single presentator by ID
 *     tags: [Presentator]
 *     parameters:
 *       - in: path
 *         name: presentatorId
 *         required: false
 *         schema:
 *           type: string
 *         description: ID of the presentator
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               presentatorName:
 *                 type: string
 *               file:
 *                 type: file
 *                 format: binary
 *               presentatorType:
 *                 type: string
 *               presentatorBio:
 *                 type: string
 *             example:
 *               presentatorName: Anum Mishra
 *               presentatorType: teacher
 *               presentatorBio: Hindi
 *               file: e892f517-c5a4-4b04-b62c-1054ca09e61c32580.jpg
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: presentator not found
 *   delete:
 *     summary: Delete a single presentator by ID
 *     tags: [Presentator]
 *     parameters:
 *       - in: path
 *         name: presentatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the presentatorId
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: presentatorId not found
 *   get:
 *     summary: Get a single presentatorId by ID
 *     tags: [Presentator]
 *     parameters:
 *       - in: path
 *         name: presentatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the presentator
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Presentator not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PresentatorInput:
 *       type: object
 *       properties:
 *         presentatorName:
 *           type: string
 *         qualification:
 *           type: string
 *         experience:
 *           type: string
 *         schoolName:
 *           type: string
 *       example:
 *         presentatorName: Anil Sharma
 *         qualification: Msc ,Bsc
 *         experience: 3 years
 *         schoolName: Shastri school lucknow
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PresentatorupdateInput:
 *       type: object
 *       properties:
 *         presentatorName:
 *           type: string
 *         presentatorType:
 *           type: string
 *         presentatorBio:
 *           type: string
 *         file:
 *           type: file
 *           format: binary
 *       example:
 *         presentatorName: Anil Sharma
 *         presentatorType: Teacher , Director
 *         presentatorBio: English
 *         file: e892f517-c5a4-4b04-b62c-1054ca09e61c32580.jpg
 */
