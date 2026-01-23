const bcrypt = require("bcryptjs");
const Hospital = require("../models/hospital.model");

// @desc    Register a new hospital
// @route   POST /api/hospitals/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const {
            hospitalName,
            email,
            password,
            phoneNumber,
            address,
            city,
            googleMapLink,
            departments,
            emergencyNumber,
            licenseNumber
        } = req.body;

        // Check if hospital already exists
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({
                success: false,
                message: "Hospital with this email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create hospital
        const hospital = await Hospital.create({
            hospitalName,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            city,
            googleMapLink,
            departments,
            emergencyNumber,
            licenseNumber
        });

        sendTokenResponse(hospital, 201, res);
    } catch (err) {
        next(err);
    }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (hospital, statusCode, res) => {
    // Create token
    const token = hospital.getSignedJwtToken();

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            id: hospital._id,
            name: hospital.hospitalName,
            email: hospital.email,
            role: hospital.role
        }
    });
};
