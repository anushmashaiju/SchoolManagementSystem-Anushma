import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFees, deleteFee, updateFeesHistory } from '../../redux-toolkit/feeSlice';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'; 
import './FeesList.css';
import { TiTick } from 'react-icons/ti';

function FeesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fees, isLoading, error } = useSelector((state) => state.fees);
  const { user } = useSelector((state) => state.auth); 

  const [editingRecordId, setEditingRecordId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    feesType: '',
    amount: '',
    paymentDate: '',
  });

  useEffect(() => {
    dispatch(fetchFees());
  }, [dispatch]);

  const handleEdit = (fee) => {
    setEditingRecordId(fee._id);
    setEditedRecord({
      feesType: fee.feesType,
      amount: fee.amount,
      paymentDate: new Date(fee.paymentDate).toISOString().split('T')[0],
    });
  };

  const handleSave = async (id) => {
    setIsSaving(true); 
    await dispatch(updateFeesHistory({ id, updatedRecord: { ...editedRecord } }));
    setIsSaving(false);
    setEditingRecordId(null);
  };

  const handleCancelEdit = () => {
    setEditingRecordId(null); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fee entry?')) {
      dispatch(deleteFee(id));
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <IoChevronBackOutline />
      </button>
      <h2>Fees History</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <table className="fees-table">
        <thead>
          <tr>
            <th>Admission No</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Division</th>
            <th>Fees Type</th>
            <th>Amount Paid</th>
            <th>Paid Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.length > 0 ? (
            fees.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.studentDetails?.admissionNo}</td>
                <td>{fee.studentDetails?.name}</td>
                <td>{fee.studentDetails?.class}</td>
                <td>{fee.studentDetails?.division}</td>
                <td>
                  {editingRecordId === fee._id ? (
                    <input
                      type="text"
                      name="feesType"
                      value={editedRecord.feesType || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    fee.feesType
                  )}
                </td>
                <td>
                  {editingRecordId === fee._id ? (
                    <input
                      type="number"
                      name="amount"
                      value={editedRecord.amount || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    fee.amount
                  )}
                </td>
                <td>
                  {editingRecordId === fee._id ? (
                    <input
                      type="date"
                      name="paymentDate"
                      value={editedRecord.paymentDate || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    new Date(fee.paymentDate).toLocaleDateString()
                  )}
                </td>
                <td>{fee.status}</td>
                <td>
                  {(user?.role === 'admin' || user?.role === 'staff') && (
                    <>
                      {editingRecordId === fee._id ? (
                        <>
                          <button className="action-button save-button" onClick={() => handleSave(fee._id)}>
                            {isSaving ? <span>Saving...</span> : <TiTick  />}
                          </button>
                          <button className="action-button cancel-button" onClick={handleCancelEdit}>
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="action-button edit-button" onClick={() => handleEdit(fee)}>
                            <FaEdit />
                          </button>
                          <button className="action-button delete-button" onClick={() => handleDelete(fee._id)}>
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No fees records available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FeesList;
