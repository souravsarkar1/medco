import mongoose from 'mongoose';

// Check if the model is already defined to prevent recompilation
export const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', new mongoose.Schema({
    personalInfo: {
        firstName: String,
        lastName: String,
        password: String,
        profileImage: String,
        // ... other personal info fields
    },
    professionalDetails: {
        specializations: [String],
        yearsOfExperience: Number,
        // ... other professional details
    },
    consultationInfo: {
        consultationType: {
            online: {
                consultationFee: Number
            }
        }
    },
    ratings: {
        averageRating: Number,
        totalReviews: Number
    }
}));

// Add the AppointmentModel
export const AppointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentType: { type: String, enum: ['Online', 'InPerson'], required: true },
    consultationType: { type: String, enum: ['Video', 'Audio', 'Chat', 'Physical'], required: true },
    timeSlot: {
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    consultationFee: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}));
