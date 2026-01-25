// controllers/mapController.js
import { findNearestHospital } from "../services/googleMapsService.js";

export const getNearestHospital = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ message: "Location required" });
        }

        const hospitals = await findNearestHospital(lat, lng);

        res.status(200).json({
            success: true,
            count: hospitals.length,
            hospitals
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};