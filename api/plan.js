export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido, usa POST" });
  }

  const { goal = "comer saludable", days = 7, diet = "Regular" } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Falta API key en servidor" });
  }

  try {
    const prompt = `
      Genera un plan de comidas de ${days} días en formato JSON.
      Objetivo: ${goal}.
      Dieta: ${diet}.
      Para cada día incluye:
      - Desayuno, almuerzo, cena y snack.
      - Ingredientes con cantidades exactas.
      - Pasos de preparación claros.
      - Nutrición (calorías, proteínas, carbohidratos, grasas).
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

    res.status(200).json({ plan: content || "No se pudo generar el plan" });
  } catch (error) {
    res.status(500).json({ error: "Error al generar plan", details: error.message });
  }
}
