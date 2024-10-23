import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFee, fetchStudentByAdmissionNo } from '../../redux-toolkit/feeSlice';
import { useNavigate } from 'react-router-dom';
import './FeesForm.css';

function FeesForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for student and fees
  const { student, isLoading, error } = useSelector((state) => state.fees);
  
  // Local state for managing form inputs
  const [newFee, setNewFee] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    division: '',
    amountPaid: '',
    paidDate: '',
    feesType: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle form input changes
  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({ ...prev, [name]: value }));

    // Fetch student when admission number changes
    if (name === 'admissionNo' && value) {
      dispatch(fetchStudentByAdmissionNo(value));
    }
  };

  // Update the form with fetched student data
  useEffect(() => {
    if (student) {
      setNewFee((prev) => ({
        ...prev,
        studentName: student.name,
        class: student.class,
        division: student.division,
      }));
    }
  }, [student]);

  // Handle form submission
  const handleFeeSubmit = async (e) => {
    e.preventDefault();

    const totalAmountDue = 1000; // Example total due logic
    const status = Number(newFee.amountPaid) >= totalAmountDue ? 'Completed' : 'Pending';

    try {
      const newFeeEntry = {
        student: student._id, // Ensure student ID from the fetched data
        feesType: newFee.feesType,
        paymentDate: newFee.paidDate,
        amount: Number(newFee.amountPaid),
        status: status,
        studentDetails: {
          name: student.name,
          class: student.class,
          division: student.division,
          admissionNo: student.admissionNo,
        },
      };

      // Dispatch addFee action to Redux
      dispatch(addFee(newFeeEntry));
      setIsSubmitted(true);

      // Navigate to fees history after 1 second
      setTimeout(() => {
        navigate('/fees');
      }, 1000);
    } catch (error) {
      console.error('Error submitting fee form:', error);
    }
  };

  return (
    <div className="fee-form-card">
      <h3>Add Fee Details</h3>
      {error && <div className="error-message">Error: {error}</div>}
      <form onSubmit={handleFeeSubmit}>
        <div>
          <label>Admission No:</label>
          <input
            type="text"
            name="admissionNo"
            value={newFee.admissionNo}
            onChange={handleFeeChange}
            required
          />
        </div>
        <div>
          <label>Name of Student:</label>
          <input
            type="text"
            name="studentName"
            value={newFee.studentName}
            readOnly
          />
        </div>
        <div>
          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={newFee.class}
            readOnly
          />
        </div>
        <div>
          <label>Division:</label>
          <input
            type="text"
            name="division"
            value={newFee.division}
            readOnly
          />
        </div>
        <div>
          <label>Fees Type:</label>
          <select
            name="feesType"
            value={newFee.feesType}
            onChange={handleFeeChange}
            required
          >
            <option value="">Select Fee Type</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Book Fee">Book Fee</option>
            <option value="Other Fee">Other Fee</option>
          </select>
        </div>
        <div>
          <label>Amount Paid:</label>
          <input
            type="number"
            name="amountPaid"
            value={newFee.amountPaid}
            onChange={handleFeeChange}
            required
          />
        </div>
        <div>
          <label>Paid Date:</label>
          <input
            type="date"
            name="paidDate"
            value={newFee.paidDate}
            onChange={handleFeeChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {isSubmitted && <div className="success-message">Payment Successful!</div>}
    </div>
  );
}

export default FeesForm;
