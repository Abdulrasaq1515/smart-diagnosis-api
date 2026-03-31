# Smart Diagnosis API

A backend system that takes patient symptoms and returns possible medical conditions with probabilities and suggested next steps, powered by Groq AI.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Groq AI (LLaMA 3 model)

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/smart-diagnosis
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /api/diagnose
Input:
```json
{ "symptoms": "fever, cough, chest pain" }
```
Output:
```json
{
  "id": "...",
  "symptoms": "fever, cough, chest pain",
  "conditions": [
    {
      "name": "Pneumonia",
      "probability": "65%",
      "suggestedTests": ["Chest X-ray", "CBC"],
      "doctorType": "Pulmonologist"
    }
  ],
  "createdAt": "..."
}
```

### GET /api/history
Returns all past diagnosis records sorted by most recent.

## AI Approach

Each request sends a structured prompt to Groq's LLaMA 3 model instructing it to return a consistent JSON array of conditions. The temperature is kept low (0.4) to ensure reliable, structured output. The response is parsed and stored in MongoDB before being returned to the client.
