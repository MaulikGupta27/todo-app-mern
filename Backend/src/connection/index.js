const mongoose = require("mongoose");

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

module.exports = {
    connectToDB,
};
