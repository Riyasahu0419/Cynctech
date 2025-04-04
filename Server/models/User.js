const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    session_id: { type: String ,default: null},
});

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel