const express = require('express');
const validate = require('../../middlewares/validate');
const recordedBroadcastValidation = require('../../validations/recorded.broadcast.validation');
const recordedBroadcastController = require('../../controllers/recorded.broadcast.controller');
const { upload } = require('../../utils/cdn');

const router = express.Router();

router
  .route('/')
  .post(
    upload.array('files', 2),
    validate(recordedBroadcastValidation.createRecordedBroadcast),
    recordedBroadcastController.createRecordedBroadcast
  )
  .get(validate(recordedBroadcastValidation.getAllRecordedBroadcasts), recordedBroadcastController.getAllRecordedBroadcast);

router
  .route('/:recordedBroadcastId')
  .get(validate(recordedBroadcastValidation.getRecordedBroadcast), recordedBroadcastController.getRecordedBroadcastById)
  .patch(
    upload.array('files', 2),
    validate(recordedBroadcastValidation.updateRecordedBroadcastById),
    recordedBroadcastController.updateRecordedBroadcastById
  )
  .delete(
    validate(recordedBroadcastValidation.deleteRecordedBroadcastById),
    recordedBroadcastController.deleteRecordedBroadcastById
  );

router
  .route('/filter/:classId/:subjectId')
  .get(
    validate(recordedBroadcastValidation.getRecordedBroadcastByFilter),
    recordedBroadcastController.getRecordedBroadcastByFilter
  );
router.get('/getrecordedvideo/:bookId', recordedBroadcastController.getRecordedBroadcastsByBookId);
router
  .route('/filterby/:boardId/:classId/:subjectId/:mediumId/:chapterId/:bookId')
  .get(validate(recordedBroadcastValidation.paramsFilters), recordedBroadcastController.getRecordedBroadcast);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: RecordedBroadcast
 *   description:   RecordedBroadcast Management System
 */

/**
 * @swagger
 * /recordedbroadcast:
 *   post:
 *     summary: Create a new RecordedBroadcast
 *     tags: [RecordedBroadcast]
 *     requestBody:
 *       description: RecordedBroadcast object to be created
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/RecordedBroadcast'
 *     responses:
 *       200:
 *         description: RecordedBroadcast created successfully
 *   get:
 *     summary: Get list of RecordedBroadcast
 *     tags: [RecordedBroadcast]
 *     responses:
 *       200:
 *         description: List of RecordedBroadcast retrieved successfully
 *
 * /recordedbroadcast/{recordedBroadcastId}:
 *   patch:
 *     summary: Update a single RecordedBroadcast by ID
 *     tags: [RecordedBroadcast]
 *     parameters:
 *       - in: path
 *         name: recordedBroadcastId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recordedBroadcast
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/RecordedBroadcastUpdate'
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: RecordedBroadcast not found
 *   delete:
 *     summary: Delete a single RecordedBroadcast by ID
 *     tags: [RecordedBroadcast]
 *     parameters:
 *       - in: path
 *         name: recordedBroadcastId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recordedBroadcast
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: RecordedBroadcast not found
 *   get:
 *     summary: Get a single RecordedBroadcast by ID
 *     tags: [RecordedBroadcast]
 *     parameters:
 *       - in: path
 *         name: recordedBroadcastId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the RecordedBroadcast
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: RecordedBroadcast not found
 */

/**
 * @swagger
 * /recordedbroadcast/filter/{classId}/{subjectId}:
 *   get:
 *     summary: Get a RecordedBroadcast data from Filter
 *     tags: [RecordedBroadcast]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class
 *       - in: path
 *         name: subjectId
 *         required: true
 *         description: The ID of the subject
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecordedBroadcast'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /recordedbroadcast/getrecordedvideo/{bookId}:
 *   get:
 *     summary: Get recorded broadcasts grouped by chapters for a given bookId
 *     tags: [RecordedBroadcast]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Successfully retrieved recorded broadcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chaptersData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       broadcasts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             title:
 *                               type: string
 *                             date:
 *                               type: string
 *                             time:
 *                               type: string
 *                             presenterName:
 *                               type: string
 *                             # Add other fields as needed
 */

/**
 * @swagger
 * /recordedbroadcast/filterby/{boardId}/{classId}/{subjectId}/{mediumId}/{chapterId}/{bookId}:
 *   get:
 *     summary: Get recorded broadcast by filters
 *     tags: [RecordedBroadcast]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: mediumId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: No recorded broadcast found
 */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     RecordedBroadcast:
//  *       type: object
//  *       properties:
//  *         boardId:
//  *           type: string
//  *           description: ID of the board.
//  *         mediumId:
//  *           type: string
//  *           description: ID of the medium.
//  *         classId:
//  *           type: string
//  *           description: ID of the class.
//  *         subjectId:
//  *           type: string
//  *           description: ID of the subject.
//  *         bookId:
//  *           type: string
//  *           description: ID of the book.
//  *         chapterId:
//  *           type: string
//  *           description: ID of the chapter.
//  *         studio:
//  *           type: string
//  *           description: ID of the studio.
//  *         liveStreamingPath:
//  *           type: string
//  *           description: Live streaming path.
//  *         date:
//  *           type: string
//  *           description: Date of the broadcast.
//  *         time:
//  *           type: string
//  *           description: Time of the broadcast.
//  *         title:
//  *           type: string
//  *           description: Title of the broadcast.
//  *         type:
//  *           type: string
//  *           description: type of the broadcast.
//  *         presenterName:
//  *           type: string
//  *           description: Presenter's name.
//  *         files:
//  *           type: array
//  *           items:
//  *           type: string
//  *           format: binary
//  *       example:
//  *         boardId: "6516761d9cee04ae5df9fb6f"
//  *         mediumId: "6516761d9cee04ae5df9fb6f"
//  *         classId: "6516761d9cee04ae5df9fb6f"
//  *         subjectId: "6516761d9cee04ae5df9fb6f"
//  *         bookId: "6516761d9cee04ae5df9fb6f"
//  *         chapterId: "6516761d9cee04ae5df9fb6f"
//  *         studio: "6516761d9cee04ae5df9fb6f"
//  *         liveStreamingPath: "rtmp://example.com/live/stream"
//  *         date: "2023-01-01"
//  *         time: "12:00 PM"
//  *         title: "Broadcast Title"
//  *         type: "Broadcast type"
//  *         presenterName: "Presenter Name"
//  *         landscapeImage: "https://example.com/landscape.jpg"
//  *         portraitImage: "https://example.com/portrait.jpg"
//  */
/**
 * @swagger
 * components:
 *   schemas:
 *     RecordedBroadcast:
 *       type: object
 *       properties:
 *         boardId:
 *           type: string
 *           description: ID of the board.
 *         mediumId:
 *           type: string
 *           description: ID of the medium.
 *         classId:
 *           type: string
 *           description: ID of the class.
 *         subjectId:
 *           type: string
 *           description: ID of the subject.
 *         bookId:
 *           type: string
 *           description: ID of the book.
 *         chapterId:
 *           type: string
 *           description: ID of the chapter.
 *         studio:
 *           type: string
 *           description: ID of the studio.
 *         liveStreamingPath:
 *           type: string
 *           description: Live streaming path.
 *         date:
 *           type: string
 *           description: Date of the broadcast.
 *         time:
 *           type: string
 *           description: Time of the broadcast.
 *         title:
 *           type: string
 *           description: Title of the broadcast.
 *         type:
 *           type: string
 *           description: Type of the broadcast.
 *         presenterName:
 *           type: string
 *           description: Presenter's name.
 *         files:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *       example:
 *         boardId: "6516761d9cee04ae5df9fb6f"
 *         mediumId: "6516761d9cee04ae5df9fb6f"
 *         classId: "6516761d9cee04ae5df9fb6f"
 *         subjectId: "6516761d9cee04ae5df9fb6f"
 *         bookId: "6516761d9cee04ae5df9fb6f"
 *         chapterId: "6516761d9cee04ae5df9fb6f"
 *         studio: "6516761d9cee04ae5df9fb6f"
 *         liveStreamingPath: "rtmp://example.com/live/stream"
 *         date: "2023-01-01"
 *         time: "12:00 PM"
 *         title: "Broadcast Title"
 *         type: "Broadcast type"
 *         presenterName: "Presenter Name"
 *         landscapeImage: "https://example.com/landscape.jpg"
 *         portraitImage: "https://example.com/portrait.jpg"
 *         files:
 *           - "file1.jpg"
 *           - "file2.mp4"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RecordedBroadcastUpdate:
 *       type: object
 *       properties:
 *         boardId:
 *           type: string
 *           description: ID of the board.
 *         mediumId:
 *           type: string
 *           description: ID of the medium.
 *         classId:
 *           type: string
 *           description: ID of the class.
 *         subjectId:
 *           type: string
 *           description: ID of the subject.
 *         bookId:
 *           type: string
 *           description: ID of the book.
 *         chapterId:
 *           type: string
 *           description: ID of the chapter.
 *         studio:
 *           type: string
 *           description: ID of the studio.
 *         liveStreamingPath:
 *           type: string
 *           description: Live streaming path.
 *         date:
 *           type: string
 *           description: Date of the broadcast.
 *         time:
 *           type: string
 *           description: Time of the broadcast.
 *         title:
 *           type: string
 *           description: Title of the broadcast.
 *         type:
 *           type: string
 *           description: Type of the broadcast.
 *         presenterName:
 *           type: string
 *           description: Presenter's name.
 *         files:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *       example:
 *         boardId: "6516761d9cee04ae5df9fb6f"
 *         mediumId: "6516761d9cee04ae5df9fb6f"
 *         classId: "6516761d9cee04ae5df9fb6f"
 *         subjectId: "6516761d9cee04ae5df9fb6f"
 *         bookId: "6516761d9cee04ae5df9fb6f"
 *         chapterId: "6516761d9cee04ae5df9fb6f"
 *         studio: "6516761d9cee04ae5df9fb6f"
 *         liveStreamingPath: "rtmp://example.com/live/stream"
 *         date: "2023-01-01"
 *         time: "12:00 PM"
 *         title: "Broadcast Title"
 *         type: "Broadcast type"
 *         presenterName: "Presenter Name"
 *         landscapeImage: "https://example.com/landscape.jpg"
 *         portraitImage: "https://example.com/portrait.jpg"
 *         files:
 *           - "file1.jpg"
 *           - "file2.mp4"
 */
