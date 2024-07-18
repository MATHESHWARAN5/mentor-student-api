const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Assign Student to Mentor
exports.assignStudentToMentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student || !mentor) {
      return res.status(404).send('Student or Mentor not found');
    }

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    student.mentor = mentor._id;
    await student.save();

    mentor.students.push(student._id);
    await mentor.save();

    res.send('Student assigned to mentor');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Reassign Mentor for Student
exports.reassignMentor = async (req, res) => {
  try {
    const { studentId, newMentorId } = req.body;
    const student = await Student.findById(studentId);
    const newMentor = await Mentor.findById(newMentorId);

    if (!student || !newMentor) {
      return res.status(404).send('Student or Mentor not found');
    }

    if (student.mentor) {
      const previousMentor = await Mentor.findById(student.mentor);
      previousMentor.students.pull(student._id);
      await previousMentor.save();
      student.previousMentors.push(student.mentor);
    }

    student.mentor = newMentor._id;
    await student.save();

    newMentor.students.push(student._id);
    await newMentor.save();

    res.send('Mentor reassigned');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get All Previous Mentors for a Student
exports.getPreviousMentorsForStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('previousMentors');
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.send(student.previousMentors);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
