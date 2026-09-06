const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Yahan apna connection string dalein)
mongoose.connect('mongodb://localhost:27017/crypto-exchange', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected Successfully")).catch(err => console.log(err));

// Trade Schema & Model
const tradeSchema = new mongoose.Schema({
    symbol: String,
    type: String,
    amount: Number,
    coinAmount: Number,
    entryPrice: Number,
    mode: String,
    date: { type: Date, default: Date.now }
});
const Trade = mongoose.model('Trade', tradeSchema);

// API Route to Save Trade
app.post('/api/trades', async (req, res) => {
    try {
        const newTrade = new Trade(req.body);
        await newTrade.save();
        res.status(201).json({ success: true, message: "Trade saved successfully", trade: newTrade });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API Route to Get Trades
app.get('/api/trades', async (req, res) => {
    try {
        const trades = await Trade.find().sort({ date: -1 });
        res.json({ success: true, trades });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 7700;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
