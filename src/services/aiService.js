const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getDiagnosis(symptoms) {
  const prompt = `You are a medical triage assistant. A patient has the following symptoms: "${symptoms}".

Return ONLY a valid JSON array (no markdown, no explanation) with 2 to 3 possible conditions in this exact format:
[
  {
    "name": "Condition Name",
    "probability": "70%",
    "suggestedTests": ["Test 1", "Test 2"],
    "doctorType": "Type of specialist"
  }
]`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  const content = response.choices[0].message.content.trim();

  const cleaned = content.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
}

module.exports = { getDiagnosis };
