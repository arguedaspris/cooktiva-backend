import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { goal, days, diet } = req.body;

    const prompt = `
Genera un plan de comidas en JSON con este formato:

{
  "plan": [
    {
      "day": 1,
      "meals": [
        { "type": "Desayuno", "title": "Nombre", "ingredients": ["..."], "instructions": ["..."] },
        { "type": "Almuerzo", "title": "Nombre", "ingredients": ["..."], "instructions": ["..."] },
        { "type": "Cena", "title": "Nombre", "ingredients": ["..."], "instructions": ["..."] }
      ]
    }
  ]
}

Meta del usuario: ${goal}.
Número de días: ${days}.
Tipo de dieta: ${diet}.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const plan = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ plan });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar plan" });
  }
}
