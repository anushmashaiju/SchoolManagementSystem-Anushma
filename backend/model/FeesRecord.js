import mongoose from 'mongoose';

const feesHistorySchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    feesType: { type: String, required: true }, // Ensure feesType is included
    paymentDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Completed', 'Pending'], required: true },
    studentDetails: {
        name: { type: String, required: true },
        class: { type: String, required: true },
        division: { type: String, required: true },
        admissionNo: { type: String, required: true }
    }
});

const FeesHistory = mongoose.model('FeesHistory', feesHistorySchema);
export default FeesHistory;
