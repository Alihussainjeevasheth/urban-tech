import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Debug check (VERY IMPORTANT)
console.log("Bedrock key loaded:", process.env.BEDROCK_API_KEY ? "YES ✅" : "NO ❌");

app.post("/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await fetch(
      "https://bedrock-runtime.us-east-1.amazonaws.com/model/anthropic.claude-3-5-sonnet-20240620-v1:0/invoke",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.BEDROCK_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Summarize the Terms of Service and list red flags:\n\n${text}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

   res.json({
    summary: `You sent ${text.length} characters`,
    redFlags: text.toLowerCase().includes("data")
      ? ["Mentions data usage"]
      : []
  });

  

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bedrock request failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});

