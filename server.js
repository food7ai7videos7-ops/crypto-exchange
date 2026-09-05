const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string
const MONGO_URI = "mongodb+srv://food7ai7videos7_db_user:JwecW4uHRJeNRka9@cluster0.48dxagy.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.log("DB Connection Error: ", err));

app.get('/', (req, res) => {
  res.send("Crypto Exchange Backend is Live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
