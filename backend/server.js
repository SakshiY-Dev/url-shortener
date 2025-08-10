const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", require("./routes/urlRoutes"));
app.use("/", require("./routes/redirectRoutes.js"));

// Default route
app.get("/", (req, res) => {
  res.send("URL Shortener Backend is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
);
