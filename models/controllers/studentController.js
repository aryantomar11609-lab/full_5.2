const Student = require('../models/Student');

 exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};

 exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student', error: err.message });
  }
};

 exports.createStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const newStudent = new Student({ name, age, course });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: 'Error creating student', error: err.message });
  }
};

 exports.updateStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating student', error: err.message });
  }
};

 exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({
      message: 'Student deleted',
      student: deletedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};
