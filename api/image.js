export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido, usa POST" });
  }

  const { prompt = "Un plato de comida saludable en estilo realista" } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Falta API key en servidor" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "512x512"   // puedes cambiar a "1024x1024" si quieres más calidad
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({
      url: data.data?.[0]?.url || null
    });
  } catch (error) {
    res.status(500).json({ error: "Error al generar imagen", details: error.message });
  }
}
