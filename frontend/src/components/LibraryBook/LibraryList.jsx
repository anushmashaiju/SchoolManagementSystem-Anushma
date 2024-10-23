import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraryHistory, updateLibraryRecord, deleteLibraryRecord } from '../../redux-toolkit/librarySlice';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; // Import Save and Cancel icons
import './LibraryList.css';
import { TiTick } from 'react-icons/ti';

function LibraryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookHistory, loading, error } = useSelector((state) => state.library);
  const user = useSelector((state) => state.auth.user); // Get user info from auth state

  // Local state to track the row being edited
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({
    bookId: '',
    bookName: '',
    authorName: '',
    borrowDate: '',
    returnDate: '',
  });

  // Local state to track saving status
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchLibraryHistory());
  }, [dispatch]);

  // Start editing a specific row
  const handleEdit = (book) => {
    setEditingRecordId(book._id); // Set the record ID being edited
    setEditedRecord({
      bookId: book.bookId,
      bookName: book.bookName,
      authorName: book.authorName,
      borrowDate: new Date(book.borrowDate).toISOString().split('T')[0], // Format date for input
      returnDate: new Date(book.returnDate).toISOString().split('T')[0], // Format date for input
    });
  };

  // Save the changes
  const handleSave = async (id) => {
    setIsSaving(true);
    await dispatch(updateLibraryRecord({ id, updatedRecord: { ...editedRecord, _id: id } }));
    setIsSaving(false);
    setEditingRecordId(null); // Exit edit mode
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingRecordId(null);
  };

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteLibraryRecord(id));
    }
  };

  return (
    <div className="library-list">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>Library History</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <table className="book-table">
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Division</th>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookHistory.length > 0 ? (
              bookHistory.map((book) => (
                <tr key={book._id}>
                  <td>{book.studentDetails?.admissionNo}</td>
                  <td>{book.studentDetails?.name}</td>
                  <td>{book.studentDetails?.class}</td>
                  <td>{book.studentDetails?.division}</td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="text"
                        name="bookId"
                        value={editedRecord.bookId || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      book.bookId
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="text"
                        name="bookName"
                        value={editedRecord.bookName || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      book.bookName
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="text"
                        name="authorName"
                        value={editedRecord.authorName || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      book.authorName
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="date"
                        name="borrowDate"
                        value={editedRecord.borrowDate || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(book.borrowDate).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="date"
                        name="returnDate"
                        value={editedRecord.returnDate || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(book.returnDate).toLocaleDateString()
                    )}
                  </td>
                  <td>{book.status}</td>
                  <td>
                    {(user?.role === 'admin' || user?.role === 'librarian') && (
                      <>
                        {editingRecordId === book._id ? (
                          <>
                            <button className="action-button save-button" onClick={() => handleSave(book._id)} >
                              {isSaving ? <FaSave /> : <TiTick  />}
                            </button>
                            <button className="action-button cancel-button" onClick={handleCancelEdit} >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="action-button edit-button" onClick={() => handleEdit(book)} >
                              <FaEdit />
                            </button>
                            <button
                              className="action-button delete-button" onClick={() => handleDelete(book._id)} >
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
                <td colSpan="11">No books history available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LibraryList;
