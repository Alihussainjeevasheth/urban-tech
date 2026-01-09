const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/summarize", async (req, res) => {
  const { text, model } = req.body;

  // TEMP demo response (replace with real AI later)
  res.json({
    summary: `Summary for model ${model}: This is a demo AI response.`,
    redFlags: [
      "Data sharing with third parties",
      "Hidden subscription charges",
      "No refund policy"
    ]
  });
});

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});



