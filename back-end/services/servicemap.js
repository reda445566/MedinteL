// services/googleMapsService.js
import axios from "axios";

export const findNearestHospital = async (lat, lng) => {
    const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
            params: {
                location: `${lat},${lng}`,
                radius: 3000,
                type: "hospital",
                key: process.env.GOOGLE_MAPS_KEY
            }
        }
    );

    if (response.data.status !== "OK") {
        throw new Error("No hospitals found");
    }

    return response.data.results.map(h => ({
        name: h.name,
        location: h.geometry.location,
        rating: h.rating || null,
        placeId: h.place_id
    }));
};