import express from "express";
import OpenAI from "openai";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

const __dirname = path.resolve();

const token = process.env.API_KEY;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

app.post("/api/gift-suggestions", async (req, res) => {
  try {
    const { recipient, age, interests, budget, occasion } = req.body;

    if (!recipient || !age || !interests || !budget || !occasion) {
      console.log("Missing fields!");
      return res.status(400).json({ error: "All fields are required." });
    }

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful gift-suggestion assistant.",
        },
        {
          role: "user",
          content: `Suggest a gift for a ${age} years old ${recipient} for a ${occasion}. Budget: ${budget}. Interests: ${interests}.Extract only three game-related gift ideas from the text and list them as bullet points, using only their names in italics (e.g., Monopoly Deal, Tetris Puzzle Game).`,
        },
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 200,
      model: modelName,
    });

    const giftSuggestions = response.choices[0].message.content;
    console.log(giftSuggestions);
    res.json({ suggestions: giftSuggestions.split("\n") });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
