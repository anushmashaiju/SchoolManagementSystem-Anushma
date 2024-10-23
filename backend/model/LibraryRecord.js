import mongoose from 'mongoose';

const libraryHistorySchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true
    },
    bookId: String,
    bookName: String,
    authorName: String,
    borrowDate: Date,
    returnDate: Date,
    status: String,
    studentDetails: { 
        name: { type: String, required: true },
        class: { type: String, required: true },
        division: { type: String, required: true },
        admissionNo: { type: Number, required: true }
    }
});

const LibraryHistory = mongoose.model('LibraryHistory', libraryHistorySchema);

export default LibraryHistory;
