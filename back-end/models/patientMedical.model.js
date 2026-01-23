const mongoose = require("mongoose");

const patientMedicalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is required']
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required']
    },
    height: {
        type: Number,
        required: [true, 'Height is required']
    },
    medications: {
        type: [String],
        default: []
    },
    otherNotes: {
        type: String
    },
    diseases: [{
        diseaseName: {
            type: String,
            required: [true, 'Disease name is required']
        },
        description: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PatientMedical", patientMedicalSchema);
