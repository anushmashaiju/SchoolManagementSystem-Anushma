import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../redux-toolkit/studentSlice'; 
import './StudentsForm.css';
import { useNavigate } from 'react-router-dom';

function StudentsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = useSelector((state) => state.auth.user); 
  const [studentDetails, setStudentDetails] = useState({
    admissionNo: '',
    name: '',
    class: '',
    division: '',
    gender: '',
    dateOfBirth: '',
    parentName: '',
    contactNo: '',
    place: '',
    dateOfJoining: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(studentDetails));
  
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/students'); 
      }, 1000);

    setStudentDetails({
      admissionNo: '',
      name: '',
      class: '',
      division: '',
      gender: '',
      dateOfBirth: '',
      parentName: '',
      contactNo: '',
      place: '',
      dateOfJoining: ''
    });
  };

  if (user?.role !== 'admin') {
    return <p>You do not have permission to add students.</p>; 
  }

  return (
    <div>
      <div className="student-form-card">
        <h3>Add New Student Details</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={studentDetails.admissionNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Name of Student:</label>
            <input
              type="text"
              name="name"
              value={studentDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Class:</label>
            <input
              type="text"
              name="class"
              value={studentDetails.class}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Division:</label>
            <select
              name="division"
              value={studentDetails.division}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={studentDetails.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={studentDetails.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Name of Parent:</label>
            <input
              type="text"
              name="parentName"
              value={studentDetails.parentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Contact No:</label>
            <input
              type="text"
              name="contactNo"
              value={studentDetails.contactNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Place:</label>
            <input
              type="text"
              name="place"
              value={studentDetails.place}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              value={studentDetails.dateOfJoining}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
         {isSubmitted && <div className="success-message">Student added successfully!</div>}
      </div>
    </div>
  );
}

export default StudentsForm;
