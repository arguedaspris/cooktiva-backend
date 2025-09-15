export default function handler(req, res) {
  if (req.method === "POST") {
    const { goal = "saludable", days = 7, diet = "General" } = req.body;

    const plan = [];
    for (let i = 1; i <= days; i++) {
      plan.push({
        day: i,
        breakfast: "Avena con frutas",
        lunch: "Ensalada mediterránea",
        dinner: "Pasta con tomate y ajo",
      });
    }

    return res.status(200).json({
      goal,
      days,
      diet,
      plan,
    });
  }

  res.status(405).json({ error: "Método no permitido" });
}
