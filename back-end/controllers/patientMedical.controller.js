const PatientMedical = require("../models/patientMedical.model");

// @desc    Create or Update Patient Medical Profile
// @route   POST /api/patients/medical-profile
// @access  Private (Patient only)
exports.createOrUpdateProfile = async (req, res, next) => {
    try {
        const {
            age,
            gender,
            weight,
            height,
            medications,
            otherNotes,
            diseaseType,
            durationInYears,
            followUpWithDoctor,
            symptoms
        } = req.body;

        // Build medical profile object
        const profileFields = {
            user: req.user.id,
            age,
            gender,
            weight,
            height,
            medications,
            otherNotes,
            diseaseType,
            durationInYears,
            followUpWithDoctor,
            symptoms
        };

        // Check if profile exists
        let profile = await PatientMedical.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await PatientMedical.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ success: true, message: 'Medical profile updated successfully', data: profile });
        }

        // Create
        profile = await PatientMedical.create(profileFields);
        res.status(201).json({ success: true, message: 'Medical profile created successfully', data: profile });

    } catch (err) {
        next(err);
    }
};

// @desc    Get Current Patient Medical Profile
// @route   GET /api/patients/medical-profile
// @access  Private
exports.getProfile = async (req, res, next) => {
    try {
        const profile = await PatientMedical.findOne({ user: req.user.id }).populate('user', 'name email');

        if (!profile) {
            return res.status(404).json({ success: false, message: 'There is no profile for this user' });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        next(err);
    }
};


