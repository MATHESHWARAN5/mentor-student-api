const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/', mentorController.createMentor);
router.get('/:mentorId/students', mentorController.getStudentsForMentor);

module.exports = router;
