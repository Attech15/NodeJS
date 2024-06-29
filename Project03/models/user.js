const mongoose = require("mongoose");
// Schema (we create the Schema)
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
}, {timestamps: true });
const User = mongoose.model('user', userSchema);// we have created the model using schema;

module.exports = User;