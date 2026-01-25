const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // Drop indexes for Users collection
        console.log("Dropping indexes for 'users'...");
        await mongoose.connection.collection('users').dropIndexes();

        console.log("Indexes dropped successfully. MongoDB will rebuild unique indexes automatically on next restart/write based on Schema.");
        console.log("Done!");
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

fixIndexes();
