import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, unique: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
