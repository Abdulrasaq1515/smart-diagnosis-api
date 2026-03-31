const DiagnosisRecord = require("../models/DiagnosisRecord");
const { getDiagnosis } = require("../services/aiService");

const diagnose = async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || symptoms.trim() === "") {
    return res.status(400).json({ error: "Symptoms are required." });
  }

  const conditions = await getDiagnosis(symptoms);

  const record = await DiagnosisRecord.create({ symptoms, conditions });

  res.status(200).json({
    id: record._id,
    symptoms: record.symptoms,
    conditions: record.conditions,
    createdAt: record.createdAt,
  });
};

const getHistory = async (req, res) => {
  const records = await DiagnosisRecord.find().sort({ createdAt: -1 });
  res.status(200).json(records);
};

module.exports = { diagnose, getHistory };
