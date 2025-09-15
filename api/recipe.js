export default function handler(req, res) {
  if (req.method === "POST") {
    const { ingredients = [], portions = 1, diet = "General" } = req.body;

    if (!ingredients.length) {
      return res.status(400).json({ error: "Debes enviar ingredientes" });
    }

    const recipe = {
      title: "Pasta con tomate y ajo",
      portions,
      diet,
      ingredients: [
        { name: "Pasta", quantity: `${100 * portions} g` },
        { name: "Tomate", quantity: `${2 * portions} unidades` },
        { name: "Ajo", quantity: `${1 * portions} diente` },
        { name: "Aceite de oliva", quantity: "2 cucharadas" },
        { name: "Sal", quantity: "al gusto" },
      ],
      steps: [
        "Cocer la pasta en agua con sal durante 10 minutos.",
        "Picar los tomates y el ajo.",
        "Sofreír el ajo en aceite de oliva 2 minutos.",
        "Añadir tomate y cocinar 5 minutos.",
        "Mezclar con la pasta cocida y servir caliente.",
      ],
      nutrition: {
        calories: 350 * portions,
        protein: 12 * portions,
        fat: 8 * portions,
        carbs: 60 * portions,
      },
    };

    return res.status(200).json(recipe);
  }

  res.status(405).json({ error: "Método no permitido" });
}
