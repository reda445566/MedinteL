const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: [true, "Hospital name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    googleMapLink: {
        type: String,
        required: [true, "Google Map Link is required"]
    },
    departments: {
        type: [String],
        default: []
    },
    emergencyNumber: {
        type: String
    },
    licenseNumber: {
        type: String,
        required: [true, "License number is required"]
    },
    role: {
        type: String,
        default: "hospital",
        immutable: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Match hospital entered password to hashed password in database
hospitalSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return (Payload includes hospitalId and role)
hospitalSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

module.exports = mongoose.model("Hospital", hospitalSchema);
