import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    res.status(200).json({ url: result.data[0].url });
  } catch (error) {
    console.error("OpenAI error:", error);

    res.status(500).json({
      error: "Error al generar imagen",
      details: error?.response?.data || error.message || error.toString(),
      env: process.env.OPENAI_API_KEY ? "API Key detectada" : "API Key ausente",
    });
  }
}
