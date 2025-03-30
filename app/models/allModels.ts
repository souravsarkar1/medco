import mongoose from "mongoose"

// Doctor Schema
const DoctorSchema = {
    // Professional Information
    personalInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        profileImage: { type: String },
        dateOfBirth: { type: Date },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        }
    },

    // Medical Credentials
    professionalDetails: {
        medicalRegistrationNumber: { type: String, required: true, unique: true },
        qualifications: [{
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            yearOfCompletion: { type: Number, required: true }
        }],
        specializations: [{ type: String, required: true }],
        languages: [{ type: String }],
        yearsOfExperience: { type: Number, required: true }
    },

    // Consultation Details
    consultationInfo: {
        consultationType: {
            online: {
                isAvailable: { type: Boolean, default: true },
                consultationFee: { type: Number },
                availableSlots: [{
                    day: { type: String },
                    startTime: { type: Date },
                    endTime: { type: Date }
                }]
            },
            inPerson: {
                isAvailable: { type: Boolean, default: true },
                consultationFee: { type: Number },
                clinicAddress: {
                    street: { type: String },
                    city: { type: String },
                    state: { type: String },
                    country: { type: String },
                    pincode: { type: String }
                },
                availableSlots: [{
                    day: { type: String },
                    startTime: { type: Date },
                    endTime: { type: Date }
                }]
            }
        },
        consultationModes: {
            video: { type: Boolean, default: true },
            audio: { type: Boolean, default: true },
            chat: { type: Boolean, default: false }
        }
    },

    // Ratings and Reviews
    ratings: {
        averageRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        reviews: [{
            patientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Patient'
            },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }]
    },

    // Medical Expertise
    medicalExpertise: {
        primarySpecialty: { type: String, required: true },
        secondarySpecialties: [{ type: String }],
        treatmentAreas: [{ type: String }],
        procedures: [{ type: String }]
    }
}


// Appointment Schema
const AppointmentSchema = {
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentType: {
        type: String,
        enum: ['Online', 'InPerson'],
        required: true
    },
    consultationType: {
        type: String,
        enum: ['Video', 'Audio', 'Chat', 'Physical'],
        required: true
    },
    scheduledDateTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // in minutes
        default: 30
    },
    status: {
        type: String,
        enum: [
            'Scheduled',
            'Confirmed',
            'Completed',
            'Cancelled',
            'Rescheduled'
        ],
        default: 'Scheduled'
    },
    consultationFee: { type: Number, required: true },
    prescription: {
        medicines: [{
            name: { type: String },
            dosage: { type: String },
            frequency: { type: String },
            duration: { type: String }
        }],
        diagnosis: { type: String },
        notes: { type: String },
        issuedDate: { type: Date }
    },
    meetingLink: { type: String }, // for online consultations
    additionalNotes: { type: String }
}

// Patient Schema
const PatientSchema = {
    personalInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: false },
        password: { type: String, required: true },
        profileImage: { type: String },
        emailOtp: { type: String },
        dateOfBirth: { type: Date },
        howManyStepsCompleted: { type: Number, default: 0 },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        }
    },
    medicalHistory: {
        chronicConditions: [{ type: String }],
        allergies: [{ type: String }],
        currentMedications: [{
            name: { type: String },
            dosage: { type: String },
            frequency: { type: String }
        }],
        familyMedicalHistory: [{
            relation: { type: String },
            condition: { type: String }
        }]
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    preferredDoctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }]
}

// Payment Schema
const PaymentSchema = {
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    amount: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Online Wallet']
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    transactionId: { type: String },
    paymentDate: { type: Date, default: Date.now }
}

// Example Node.js Controller for Doctor Booking
export const DoctorModel = mongoose.model('Doctor', new mongoose.Schema(DoctorSchema));
export const PatientModel = mongoose.model('Patient', new mongoose.Schema(PatientSchema));
export const AppointmentModel = mongoose.model('Appointment', new mongoose.Schema(AppointmentSchema));
export const PaymentModel = mongoose.model('Payment', new mongoose.Schema(PaymentSchema));