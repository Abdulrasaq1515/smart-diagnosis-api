const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema({
  name: String,
  probability: String,
  suggestedTests: [String],
  doctorType: String,
});

const diagnosisRecordSchema = new mongoose.Schema(
  {
    symptoms: { type: String, required: true },
    conditions: [conditionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiagnosisRecord", diagnosisRecordSchema);
