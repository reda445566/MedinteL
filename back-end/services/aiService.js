const axios = require('axios');

/**
 * AI Service to handle medical analysis and chatbot responses using OpenRouter
 */
exports.analyzeUserQuery = async (question, medicalProfile) => {

    // 1. Prepare Context from Medical Profile
    const context = `
    Patient Profile:
    - Age: ${medicalProfile.age}
    - Gender: ${medicalProfile.gender}
    - Weight: ${medicalProfile.weight}kg, Height: ${medicalProfile.height}cm
    - Current Medications: ${medicalProfile.medications.join(", ") || "None"}
    - Diagnosed Conditions: ${medicalProfile.diseases.map(d => d.diseaseName + " (" + (d.description || "") + ")").join(", ") || "None"}
    - Other Notes: ${medicalProfile.otherNotes || "None"}
    `;

    // 2. Construct System Prompt
    const systemPrompt = `
    You are MedIntel AI, a professional medical assistant.
    Answer the patient's question based strictly on their medical profile provided below.
    
    Rules:
    1. Be concise, empathetic, and clear.
    2. If the question relates to their conditions (e.g., diabetes), give specific advice based on their data.
    3. If the question is critical/emergency, advise them to call emergency services immediately.
    4. Always strictly warn that you are an AI and they must consult a doctor.
    5. Mention sources like "WHO" or "MedIntel Database" where applicable.
    
    ${context}
    `;

    try {
        // 3. Call OpenRouter API
        if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY.includes('xxxx')) {
            throw new Error("OpenRouter API Key is missing");
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3-8b-instruct:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: question }
                ],
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://medintel.app",
                    "X-Title": "MedIntel"
                }
            }
        );

        const answer = response.data.choices[0].message.content;

        return {
            answer: answer,
            sources: ["WHO", "MedIntel Medical Dataset", "OpenRouter AI"]
        };

    } catch (error) {
        if (error.response) {
            console.error("AI Service Error Data:", error.response.data);
            console.error("AI Service Error Status:", error.response.status);
        } else {
            console.error("AI Service Error:", error.message);
        }

        // Fallback to offline logic if API fails
        return {
            answer: "I am currently unable to reach the AI server. However, based on your profile, please adhere to your prescribed medications and consult your local doctor for this specific query.",
            sources: ["MedIntel Offline System"]
        };
    }
};
