import Student from "../model/Student.js";
import LibraryHistory from '../model/LibraryRecord.js';
import FeesHistory from '../model/FeesRecord.js';

// Add new student(s)
export const addStudent = async (req, res) => {
  try {
    const studentsData = Array.isArray(req.body) ? req.body : [req.body]; // Check if req.body is an array
    const students = await Student.insertMany(studentsData);
    res.status(201).json({
      message: `${students.length} student(s) added successfully`,
      students,
    });
  } catch (err) {
    res.status(400).json({ error: "Error adding student(s)" });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: "Error updating student" });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
};

// Get student by admissionNo
export const getStudentByAdmissionNo = async (req, res) => {
  try {
    console.log("Request Params:", req.params); 
    const admissionNo = req.params.admissionNo; 
    const student = await Student.findOne({ admissionNo: admissionNo });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err); // Log the error
    res.status(500).json({ error: "Server error" });
  }
};

// Get student details, fees history, and library history
export const getStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id; // Student ID from the URL
    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    // Fetch student's fees history
    const feesHistory = await FeesHistory.find({ student: studentId });
    // Fetch student's library history
    const libraryHistory = await LibraryHistory.find({ student: studentId });
    // Return all data in one response
    res.status(200).json({
      student,
      feesHistory,
      libraryHistory
    });
  } catch (err) {
    console.error('Error fetching student details:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

