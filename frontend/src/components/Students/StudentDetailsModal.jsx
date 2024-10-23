import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { fetchStudentDetails } from '../../redux-toolkit/studentSlice'; 
import './StudentDetailsModal.css';

const StudentDetailsModal = ({ show, handleClose, studentId }) => {
  const dispatch = useDispatch();
  const { studentDetails, isLoading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentDetails(studentId));
    }
  }, [dispatch, studentId]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {studentDetails && (
          <div>
            <h5>Basic Information</h5>
            <p><strong>Admission No:</strong> {studentDetails.student.admissionNo}</p>
            <p><strong>Name:</strong> {studentDetails.student.name}</p>
            <p><strong>Class:</strong> {studentDetails.student.class}</p>
            <p><strong>Division:</strong> {studentDetails.student.division}</p>
            <p><strong>Gender:</strong> {studentDetails.student.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(studentDetails.student.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Parent Name:</strong> {studentDetails.student.parentName}</p>
            <p><strong>Contact No:</strong> {studentDetails.student.contactNo}</p>
            <p><strong>Place:</strong> {studentDetails.student.place}</p>
            <p><strong>Date of Joining:</strong> {new Date(studentDetails.student.dateOfJoining).toLocaleDateString()}</p>

            <h5>Fees History</h5>
         
              {studentDetails.feesHistory.map((fee) => (
                <li key={fee._id}>
                  {fee.feesType}: {fee.amount} - {fee.status} on {new Date(fee.paymentDate).toLocaleDateString()}
                </li>
              ))}
         

            <h5>Library History</h5>
       
              {studentDetails.libraryHistory.map((book) => (
                <li key={book._id}>
                  {book.bookName} by {book.authorName} - {book.status} 
                  {book.borrowDate && ` - Borrowed on: ${new Date(book.borrowDate).toLocaleDateString()}`}
                  {book.returnDate && `, Returned on: ${new Date(book.returnDate).toLocaleDateString()}`}
                </li>
              ))}
        
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetailsModal;
