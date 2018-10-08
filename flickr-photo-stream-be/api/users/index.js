const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/').post(controller.postUser);
router.route('/:id').get(controller.getUserById);
router.route('/check-email').get(controller.getUserByEmail);
router.route('/check-given-name').get(controller.getUserByGivenName);
router.route('/update-user').post(controller.updateUser);
router.route('/:id').delete(controller.deleteUser);

module.exports = router;
