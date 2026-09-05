const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // User model import kiya

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

// 1. Test Route
app.get('/', (req, res) => {
    res.json({ message: "Crypto Exchange Backend is Live and Running smoothly!" });
});

// 2. User Register Route (Naya account banane ke liye)
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered!" });
        }
        const newUser = new User({ username, email, password, walletBalance: 0 });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Deposit USDT Route (Virtual balance barhane ke liye)
app.post('/api/deposit', async (req, res) => {
    try {
        const { userId, amount } = req.body; // amount matlab USDT value
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        user.walletBalance += Number(amount); // Balance mein deposit add ho jayega
        await user.save();
        res.json({ message: "Deposit successful!", newBalance: user.walletBalance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
