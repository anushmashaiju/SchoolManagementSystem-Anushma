import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    division: { type: String, required: true },
    admissionNo: { type: Number, required: true, unique: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    parentName: { type: String, required: true },
    contactNo: { type: String, required: true }, 
    place: { type: String, required: true },
    dateOfJoining: { type: Date, default: Date.now }, 
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
