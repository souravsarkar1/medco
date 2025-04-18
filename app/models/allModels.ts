import mongoose, { Schema, model, Model, models } from 'mongoose';

// Define interfaces
interface IPatient {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        dateOfBirth?: Date;
        gender?: string;
        howManyStepsCompleted: number;
    };
    medicalHistory?: {
        chronicConditions: string[];
        allergies: string[];
        currentMedications: Array<{
            name: string;
            dosage: string;
            frequency: string;
        }>;
        familyMedicalHistory: Array<{
            relation: string;
            condition: string;
        }>;
    };
    appointments: mongoose.Types.ObjectId[];
    preferredDoctors: mongoose.Types.ObjectId[];
}

// Define schemas
const PatientSchema = new Schema<IPatient>({
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        dateOfBirth: Date,
        gender: String,
        howManyStepsCompleted: { type: Number, default: 0 }
    },
    medicalHistory: {
        chronicConditions: [String],
        allergies: [String],
        currentMedications: [{
            name: String,
            dosage: String,
            frequency: String
        }],
        familyMedicalHistory: [{
            relation: String,
            condition: String
        }]
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    preferredDoctors: [{
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }]
});

// Create and export models
export const PatientModel: Model<IPatient> = models.Patient || model<IPatient>('Patient', PatientSchema);

const TimeSlotSchema = new Schema({
    startTime: String,
    endTime: String,
    isBooked: { type: Boolean, default: false }
});

const DaySlotSchema = new Schema({
    day: String,
    slots: [TimeSlotSchema]
});

const ConsultationTypeSchema = new Schema({
    consultationFee: Number,
    isAvailable: { type: Boolean, default: true },
    timeSlots: [DaySlotSchema]
});

export const DoctorModel = models.Doctor || model('Doctor', new Schema({
    personalInfo: {
        firstName: String,
        lastName: String,
        password: String,
        profileImage: String,
    },
    professionalDetails: {
        specializations: [String],
        yearsOfExperience: Number,
    },
    consultationInfo: {
        consultationType: {
            online: ConsultationTypeSchema,
            inPerson: ConsultationTypeSchema
        },
        consultationModes: {
            video: Boolean,
            audio: Boolean,
            chat: Boolean
        }
    },
    ratings: {
        averageRating: Number,
        totalReviews: Number
    }
}));

// Add the AppointmentModel
export const AppointmentModel = models.Appointment || model('Appointment', new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
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
