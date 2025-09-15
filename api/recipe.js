export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido, usa POST" });
  }

  const { ingredients = [], portions = 2, diet = "Regular" } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Falta API key en servidor" });
  }

  try {
    const prompt = `
      Genera una receta detallada en formato JSON.
      Ingredientes: ${ingredients.join(", ")}.
      Porciones: ${portions}.
      Dieta: ${diet}.
      Incluye:
      - título
      - lista de ingredientes con cantidades exactas
      - pasos de preparación claros con tiempos/temperaturas
      - valores nutricionales (calorías, proteínas, carbohidratos, grasas)
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    res.status(200).json({ recipe: content || "No se pudo generar receta" });
  } catch (error) {
    res.status(500).json({ error: "Error al generar receta", details: error.message });
  }
}
