import React, { useState, useEffect } from "react";
import "./recipeList.css";
import RecipeCard from "./recipe-list-components/RecipeCard.js";
import useAuth from "../../auth/useAuth";
import RecipeService from "../../services/RecipeService";
import { useNavigate } from "react-router-dom";
const GET_RECIPE_URL = "/api/recipe/recipe-list";

export default function RecipeList({ searchTerm }) {
  const [recipes, setRecipes] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState('');

  function deleteRecipe(recipeToDeleteId) {
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeToDeleteId));
  }

  function handleAddRecipe() {
    navigate('/add')
  }

  useEffect(() => {
    try {
      RecipeService.get(GET_RECIPE_URL, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setRecipes(response.data);
      });
    } catch (err) {
      setErrors("Recipe list not found.");
    }
  }, [auth.accessToken]);

  const searchedRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const recipeElements = searchedRecipes.map((recipe) => (
    <RecipeCard
      key={recipe.id}
      id={recipe.id}
      name={recipe.name}
      description={recipe.description}
      imageUrl={recipe.imageUrl}
      steps={recipe.steps}
      ingredients={recipe.ingredients}
      title={recipe.title}
      time={recipe.time}
      deleteRecipe={deleteRecipe}
    />
  ));

  return (
    <div className="recipeListPage">
      {recipeElements.length > 0 && <>
        <div className="recipeListPage">
          {errors && <p className="errors">{errors}</p>}
          {recipeElements}
        </div>
      </>}
      {recipeElements.length === 0 && <>
        {searchTerm ? 
          <div className="recipeListNoRecipe">
          <p>Oops! No recipes match your search!</p>
          <button onClick={handleAddRecipe} className="add-recipe-button">Add a new recipe?</button>
          </div> :
          <div className="recipeListNoRecipe">
          <p>Oops! Looks like you don't have any recipes!</p>
          <button onClick={handleAddRecipe} className="add-recipe-button">Add a new recipe?</button>
          </div>
        }
      </>}
    </div>
  );
}
