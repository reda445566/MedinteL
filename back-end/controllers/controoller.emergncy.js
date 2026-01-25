// controllers/emergencyController.js
const { handleEmergency } = require("../services/emergencyService");

exports.emergencyRequest = async (req, res) => {
    try {
        const emergency = await handleEmergency(req.body);

        res.status(201).json({
            success: true,
            emergency
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





// controllers/emergencyController.js
const { handleEmergency } = require("../services/emergencyService");

exports.emergencyRequest = async (req, res) => {
    try {
        const emergency = await handleEmergency(req.body);

        res.status(201).json({
            success: true,
            emergency
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};