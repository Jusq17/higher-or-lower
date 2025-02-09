import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;