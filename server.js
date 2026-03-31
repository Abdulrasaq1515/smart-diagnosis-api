require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const diagnosisRoutes = require("./src/routes/diagnosis");

const app = express();
app.use(express.json());

app.use("/api", diagnosisRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
