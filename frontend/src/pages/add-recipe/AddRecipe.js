import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addRecipe.css";
import UserService from "../../services/UserService";
import useAuth from "../../auth/useAuth";
const RECIPE_URL = "/api/recipe/add-recipe";

let nextId = 0;

export default function AddRecipe() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(''); 
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientArr, setIngredientArr] = useState([]);
  const [stepStr, setStepStr] = useState("");
  const [stepArr, setStepArr] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState('');

  function handleRecipeNameChange(event) {
    const { value } = event.target;
    setRecipeName(value);
  }

  function handleDescriptionChange(event) {
    const { value } = event.target;
    setDescription(value);
  }

  function handleTimeChange(event) {
    const { value } = event.target;
    setTime(value);
  }

  function handleIngredient(event) {
    const { value } = event.target;
    setIngredientName(value);
  }

  function addIngredient() {
    setIngredientArr([
      ...ingredientArr,
      { id: nextId++, name: ingredientName },
    ]);
    setIngredientName("");
  }

  function handleStep(event) {
    const { value } = event.target;
    setStepStr(value);
  }

  function addStep() {
    setStepArr([...stepArr, { id: nextId++, name: stepStr }]);
    setStepStr("");
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const formattedIngredients = ingredientArr.map(
      (ingredient) => ingredient.name
    );
    const formattedSteps = stepArr.map((step) => step.name);
    const payload = {
      name: recipeName,
      description: description,
      ingredients: formattedIngredients,
      steps: formattedSteps,
      time: time,
      imageUrl: selectedImageUrl,
    };
    try {
      if (!recipeName || !description || !time || formattedIngredients.length === 0 || formattedSteps === 0) {
        setErrors('Recipe must contain a name, description, ingredients, steps, and time to cook.');
      } else {
        await UserService.post(RECIPE_URL, payload, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        navigate("/");
      }
    } catch (err) {
      setErrors('Uknown error. Recipe not added.')
    }
  }

  function handleKeyDown(key, callPassedInFunction) {
    if (key === "Enter") {
      callPassedInFunction()
    }
  }

  return (
    <div className="recipe-page">
      <div className="add-recipe">
        <h1>Buzz in a Recipe!</h1>
        <div className="add-recipe-input">
          <label className="recipe-name">Name: </label>
          <input
            className="add-recipe-input-field"
            type="text"
            name="recipeName"
            onChange={handleRecipeNameChange}
            value={recipeName}
          />
        </div>
        <div className="add-recipe-input">
          <label className="recipe-description">Description: </label>
          <input
            className="add-recipe-input-field"
            type="text"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>
        <div className="add-recipe-input">
          <label className="recipe-ingredients">Ingredients: </label>
          <div className="multipleIngredient-container">
            <input
              className="add-recipe-input-field"
              type="text"
              name="ingredient"
              onKeyDown={(e) => handleKeyDown(e.key, addIngredient)}
              onChange={handleIngredient}
              value={ingredientName}
            />
          </div>
          <button className="extraInput" onClick={addIngredient}>
            Add Ingredient
          </button>
          {ingredientArr.length > 0 && <ul>
            {ingredientArr.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}
                <div className="flex-button">
                  <button
                    onClick={() => {
                      setIngredientArr(
                        ingredientArr.filter((a) => a.id !== ingredient.id)
                      );
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>}
        </div>
        <div className="add-recipe-input">
          <label className="recipe-steps">Steps: </label>
          <div className="multipleSteps-container">
            <input
              className="add-recipe-input-field"
              type="text"
              name="step"
              onChange={handleStep}
              value={stepStr}
              onKeyDown={(e) => handleKeyDown(e.key, addStep)}
            />
          </div>
          <button className="extraInput" onClick={addStep}>
            Add Step
          </button>
          {(stepArr.length > 0) && <ol>
            {stepArr.map((step) => (
              <li key={step.id}>
                {step.name}
                <div className="flex-button">
                  <button
                    onClick={() => {
                      setStepArr(stepArr.filter((a) => a.id !== step.id));
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ol>}
        </div>
        <div className="add-recipe-input">
          <label className="recipe-time">Time to Cook: </label>
          <input
            className="add-recipe-input-field"
            type="text"
            name="time"
            onChange={handleTimeChange}
            value={time}
          />
        </div>
        <div className="add-recipe-input">
          <div className="add-image">
            <label className="recipe-image">Upload an Image URL: </label>
            <input
              className="add-image-field"
              type="text"
              onChange={(e) => {
                setSelectedImageUrl(e.target.value);
                setPreview(e.target.value);
              }}
              value={selectedImageUrl}
              />
            {preview && (
              <img className="preview-image" src={preview} alt="Preview" />
              )}
          </div>
        </div>
        {errors && <p className="errors">{errors}</p>}
        <button onClick={handleFormSubmit}>Add Recipe to Your Hive!</button>
      </div>
    </div>
  );
}
