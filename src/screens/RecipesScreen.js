import React from "react";
import { View, Text, FlatList, Image } from "react-native";

export default function RecipesScreen({ route }) {
  const { recipes } = route.params || { recipes: [] };

  if (recipes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hay recetas disponibles con esos ingredientes.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ margin: 15, padding: 10, borderWidth: 1, borderColor: "#ddd" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            {item.title}
          </Text>
          <Text>Calorías: {item.nutrition?.calories}</Text>
          <Text>Proteínas: {item.nutrition?.protein} g</Text>
          <Text>Carbohidratos: {item.nutrition?.carbs} g</Text>
          <Text>Grasas: {item.nutrition?.fat} g</Text>

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Ingredientes:</Text>
          {item.ingredients.map((ing, i) => (
            <Text key={i}>• {ing.quantity} {ing.unit} {ing.name}</Text>
          ))}

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Instrucciones:</Text>
          {item.steps.map((step, i) => (
            <Text key={i}>{i + 1}. {step}</Text>
          ))}
        </View>
      )}
    />
  );
}
