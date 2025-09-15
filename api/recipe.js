import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { ingredients, portions, diet } = req.body;

    const prompt = `
Genera una receta en JSON estrictamente con este formato:

{
  "title": "Nombre de la receta",
  "ingredients": [
    { "name": "Ingrediente", "quantity": "Cantidad" }
  ],
  "instructions": ["Paso 1", "Paso 2", "Paso 3"],
  "nutrition": {
    "calories": 0,
    "protein": "0g",
    "fat": "0g",
    "carbs": "0g"
  }
}

Usa únicamente estos ingredientes: ${ingredients.join(", ")}.
Porciones: ${portions}.
Dieta: ${diet}.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const recipe = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ recipe });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar receta" });
  }
}
