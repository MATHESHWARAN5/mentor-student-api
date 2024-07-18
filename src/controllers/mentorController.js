const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create Mentor
exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get All Students for a Mentor
exports.getStudentsForMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    if (!mentor) {
      return res.status(404).send('Mentor not found');
    }
    res.send(mentor.students);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
