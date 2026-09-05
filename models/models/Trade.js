const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true }, // Jaise BTCUSDT ya ETHUSDT
    type: { type: String, enum: ['BUY', 'SELL'], required: true },
    amount: { type: Number, required: true }, // Invested USDT amount
    entryPrice: { type: Number, required: true },
    exitPrice: { type: Number, default: null },
    profitOrLoss: { type: Number, default: 0 },
    platformFee: { type: Number, required: true }, // Admin ki guaranteed fee jo cut hogi
    status: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
