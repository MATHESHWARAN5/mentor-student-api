const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.put('/assign', studentController.assignStudentToMentor);
router.put('/reassign', studentController.reassignMentor);
router.get('/:studentId/previous-mentors', studentController.getPreviousMentorsForStudent);

module.exports = router;
