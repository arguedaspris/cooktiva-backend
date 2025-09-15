// api/image.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el campo 'prompt'" });
    }

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024", // 👈 tamaño válido
    });

    const imageUrl = response.data[0].url;

    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Error generando imagen:", error);
    return res.status(500).json({
      error: "Error al generar la imagen",
      details: error.message,
    });
  }
}
