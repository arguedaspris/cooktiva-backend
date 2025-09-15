import React, { useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import { getRecipesByIngredients } from "../data/recipes";

export default function TodayScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleSearchRecipes = () => {
    const results = getRecipesByIngredients(ingredients);
    navigation.navigate("Recetas", { recipes: results });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Ingredientes disponibles en mi refrigerador y/o despensa
      </Text>

      <TextInput
        placeholder="Añadir ingrediente"
        value={newIngredient}
        onChangeText={setNewIngredient}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginBottom: 10,
        }}
      />
      <Button title="Agregar" onPress={handleAddIngredient} />

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>• {item}</Text>}
        style={{ marginVertical: 10 }}
      />

      <Button title="Generar recetas" onPress={handleSearchRecipes} />
    </View>
  );
}
