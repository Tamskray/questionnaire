require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const quizRoutes = require("./routes/quizRoutes");
const completionRoutes = require("./routes/completionRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/quizzes", quizRoutes);
app.use("/api/completions", completionRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
