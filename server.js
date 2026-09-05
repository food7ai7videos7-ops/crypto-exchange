const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Simple In-Memory Database (Testing ke liye)
let users = [];
let trades = [];

// Home route
app.get('/', (req, res) => {
    res.send('Crypto Exchange Server is Live and Working!');
});

// Register User
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = { _id: Date.now().toString(), username, email, walletBalance: 0 };
    users.push(newUser);
    res.json({ message: "User registered successfully", user: newUser });
});

// Deposit USDT
app.post('/api/deposit', (req, res) => {
    const { userId, amount } = req.body;
    const user = users.find(u => u._id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    user.walletBalance += Number(amount);
    res.json({ message: "Deposit successful", newBalance: user.walletBalance });
});

// Open Trade
app.post('/api/trade/open', (req, res) => {
    const { userId, symbol, type, amount, entryPrice, target, stopLoss } = req.body;
    const user = users.find(u => u._id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.walletBalance < amount) return res.status(400).json({ error: "Insufficient balance" });

    user.walletBalance -= Number(amount);
    const newTrade = {
        _id: Date.now().toString(),
        userId, symbol, type, amount, entryPrice, target, stopLoss, status: 'OPEN'
    };
    trades.push(newTrade);
    res.json({ message: "Trade opened successfully", trade: newTrade, remainingBalance: user.walletBalance });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
