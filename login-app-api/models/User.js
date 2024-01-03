import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => {
            return this.createdAt.toLocaleDateString();
        }
    }
});

export default mongoose.model("User", UserSchema);