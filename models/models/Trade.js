const mongoose = require('mongoose');

const CreateTradeSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    type: { type: String, required: true }, // BUY or SELL
    amount: { type: Number, required: true },
    coinAmount: { type: Number, required: true },
    entryPrice: { type: Number, required: true },
    mode: { type: String, required: true }, // DEMO or REAL
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CreateTrade', CreateTradeSchema);
