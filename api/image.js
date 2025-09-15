import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "auto"   // ✅ corregido
    });

    res.status(200).json({ url: image.data[0].url });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar imagen" });
  }
}
