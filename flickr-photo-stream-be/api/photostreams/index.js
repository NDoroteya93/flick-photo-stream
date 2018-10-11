const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/').get(controller.getPhotostreams);
router.route('/search').get(controller.getPhotostreamByTag);
router.route('/:id').get(controller.getPhotostream);
router.route('/:id').delete(controller.deletePhotostream);
router.route('/').post(controller.postPhotostream);

module.exports = router;
