import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectDB() {
    if (mongoose.connections[0].readyState) {
        // Use existing database connection
        return;
    }

    // Use new database connection
    await mongoose.connect(MONGODB_URI);
}
