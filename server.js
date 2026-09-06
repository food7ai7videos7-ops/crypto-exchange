const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/crypto-exchange', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected Successfully")).catch(err => console.log(err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    balance: { type: Number, default: 0 }
});
const User = mongoose.model('User', userSchema);

// Trade Schema & Model
const tradeSchema = new mongoose.Schema({
    userId: String,
    symbol: String,
    type: String,
    amount: Number,
    entryPrice: Number,
    platformFee: Number,
    target: Number,
    stopLoss: Number,
    status: { type: String, default: 'OPEN' },
    exitPrice: Number,
    date: { type: Date, default: Date.now }
});
const Trade = mongoose.model('Trade', tradeSchema);

// 1. Register User API
app.post('/api/register', async (req, res) => {
    try {
        const { username, email } = req.body;
        const newUser = new User({ username, email });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully", user: { _id: newUser._id } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Deposit API
app.post('/api/deposit', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
        user.balance += Number(amount);
        await user.save();
        res.json({ success: true, message: "Deposit successful", user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. Open Trade API
app.post('/api/trade/open', async (req, res) => {
    try {
        const newTrade = new Trade(req.body);
        await newTrade.save();
        res.status(201).json({ success: true, message: "Trade opened successfully", trade: { _id: newTrade._id } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. Close Trade API
app.post('/api/trade/close', async (req, res) => {
    try {
        const { tradeId, exitPrice } = req.body;
        const trade = await Trade.findById(tradeId);
        if (!trade) return res.status(404).json({ success: false, message: "Trade not found" });

        trade.exitPrice = exitPrice;
        trade.status = 'CLOSED';
        await trade.save();
        res.json({ success: true, message: "Trade closed successfully", trade });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 7700;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
