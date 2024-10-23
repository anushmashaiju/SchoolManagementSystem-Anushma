import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentByAdmissionNo,
  getStudentDetails
} from '../controllers/studentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const studentRouter = Router();

// Route to get all students 
studentRouter.get('/student', getAllStudents);

// Route to get a student by ID 
studentRouter.get('/student/:id', getStudentById);

// Route to add a new student 
studentRouter.post('/add-student', verifyToken, addStudent);

// Route to update a student 
studentRouter.put('/student/:id', verifyToken, updateStudent);

// Route to delete a student 
studentRouter.delete('/student/:id', verifyToken, deleteStudent);

// Route to get a student by admission number 
studentRouter.get('/student/admission/:admissionNo', getStudentByAdmissionNo);

studentRouter.get('/student/details/:id',  getStudentDetails);

export default studentRouter;
