const PatientMedical = require("../models/patientMedical.model");
const aiService = require("../services/aiService");

// @desc    Process Chatbot Query
// @route   POST /api/chatbot/query
// @access  Private (Patient only)
exports.chatQuery = async (req, res, next) => {
    try {
        const { question } = req.body;
        const patientId = req.user.id; // Get ID directly from valid token

        // 1. Validation: Ensure question exists
        if (!question) {
            return res.status(400).json({ success: false, message: 'Please provide a question.' });
        }

        // 2. No need for manual security check as we rely on the token now

        // 3. Fetch Patient Medical Profile
        const medicalProfile = await PatientMedical.findOne({ user: patientId });

        if (!medicalProfile) {
            return res.status(404).json({
                success: false,
                message: 'Medical profile not found. Please complete your profile first.'
            });
        }

        // 4. Call AI Service to process query with context
        const aiResponse = await aiService.analyzeUserQuery(question, medicalProfile);

        // 5. Send Response
        res.status(200).json({
            success: true,
            answer: aiResponse.answer,
            sources: aiResponse.sources
        });

    } catch (err) {
        next(err);
    }
};
