import mongoose from "mongoose"


const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) throw new Error("NEXT_PUBLIC_MONGODB_URI is missing in .env.local");


let cached: { conn: any; promise: any } = (global as any).mongoose || { conn: null, promise: null };


export async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as any).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}