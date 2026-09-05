const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://food7ai7videos7-db_user:JwecW4uHRJeNRka9@cluster0.48dxagy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Database Connected Successfully!");
}).catch((err) => {
    console.log("Database Connection Error: ", err);
});

// Basic Test Route
app.get('/', (req, res) => {
    res.json({ message: "Crypto Exchange Backend is Live and Running smoothly!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
