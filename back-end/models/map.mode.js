// models/Hospital.js
const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        placeId: {
            type: String,
            required: true,
            unique: true
        },

        address: {
            type: String,
            required: true
        },

        phone: {
            type: String
        },

        // GeoJSON location (IMPORTANT)
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number], // [lng, lat]
                required: true
            }
        },

        specialties: [
            {
                type: String,
                enum: ["cardiology", "diabetes", "pressure", "emergency", "general"]
            }
        ],

        isEmergencyAvailable: {
            type: Boolean,
            default: true
        },

        rating: {
            type: Number,
            min: 0,
            max: 5
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// 🔥 Spatial Index
hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);

