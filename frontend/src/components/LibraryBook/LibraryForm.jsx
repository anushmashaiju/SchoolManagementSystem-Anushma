import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLibraryRecord, fetchStudentByAdmissionNo, resetStudentData } from '../../redux-toolkit/librarySlice';
import { useNavigate } from 'react-router-dom';
import './LibraryForm.css';

function LibraryForm() {
  const [newBook, setNewBook] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    division: '',
    bookId: '',
    bookName: '',
    authorName: '',
    borrowDate: '',
    returnDate: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.library.student);
  const isLoading = useSelector((state) => state.library.loading); // Get loading state

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));

    if (name === 'admissionNo' && value) {
      dispatch(fetchStudentByAdmissionNo(value));
    }
  };

  useEffect(() => {
    if (student) {
      setNewBook((prev) => ({
        ...prev,
        studentName: student.name,
        class: student.class,
        division: student.division,
      }));
    }
  }, [student]);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const status = newBook.returnDate ? 'Returned' : 'Not Returned';
  
      const newBookEntry = {
        student: student._id,
        bookId: newBook.bookId,
        bookName: newBook.bookName,
        authorName: newBook.authorName,
        borrowDate: newBook.borrowDate,
        returnDate: newBook.returnDate,
        status,
        studentDetails: {
          name: student.name,
          class: student.class,
          division: student.division,
          admissionNo: student.admissionNo,
        },
      };
  
      await dispatch(addLibraryRecord(newBookEntry)).unwrap();
      setIsSubmitted(true);
  
      setTimeout(() => {
        // Navigate back to the library list
        navigate('/library');
  
        // Reset form fields and clear student data
        setNewBook({
          admissionNo: '',
          studentName: '',
          class: '',
          division: '',
          bookId: '',
          bookName: '',
          authorName: '',
          borrowDate: '',
          returnDate: '',
        });
  
        // Dispatch the reset action to clear student data from the store
        dispatch(resetStudentData());
      }, 1000);
    } catch (error) {
      console.error('Error submitting book form:', error);
    }
  };
  
  return (
    <div>
      <div className="library-form-card">
        <h3>Add Book Details</h3>
        <form onSubmit={handleBookSubmit}>
          <div>
            <label>Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={newBook.admissionNo}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Name of Student:</label>
            <input
              type="text"
              name="studentName"
              value={newBook.studentName}
              readOnly
              required
            />
          </div>
          <div>
            <label>Class:</label>
            <input
              type="text"
              name="class"
              value={newBook.class}
              readOnly
              required
            />
          </div>
          <div>
            <label>Division:</label>
            <input
              type="text"
              name="division"
              value={newBook.division}
              readOnly
              required
            />
          </div>
          <div>
            <label>Book ID:</label>
            <input
              type="text"
              name="bookId"
              value={newBook.bookId}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Book Name:</label>
            <input
              type="text"
              name="bookName"
              value={newBook.bookName}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Author Name:</label>
            <input
              type="text"
              name="authorName"
              value={newBook.authorName}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Borrow Date:</label>
            <input
              type="date"
              name="borrowDate"
              value={newBook.borrowDate}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Return Date:</label>
            <input
              type="date"
              name="returnDate"
              value={newBook.returnDate}
              onChange={handleBookChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>Submit</button>
        </form>
        {isSubmitted && <div className="success-message">Book added successfully!</div>}
        {isLoading && <div className="loading-message">Loading...</div>}
      </div>
    </div>
  );
}

export default LibraryForm;
