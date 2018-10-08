const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/').get(controller.getPhotostreams);
router.route('/:id').get(controller.getPhotostream);
router.route('/').post(controller.postPhotostream);
router.route('/:id').delete(controller.deletePhotostream);

module.exports = router;
