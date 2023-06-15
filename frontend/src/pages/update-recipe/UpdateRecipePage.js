import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavbarNoSearch from "../components/NavbarNoSearch";
import UpdateRecipe from "./UpdateRecipe";
import useAuth from "../../auth/useAuth";

import './updateRecipe.css';
import RecipeService from "../../services/RecipeService";
const EDIT_RECIPE_URL = '/api/recipe/edit/'

let nextId = 0;

export default function UpdateRecipePage() {
    const { id } = useParams();
    const { auth } = useAuth();

    const [recipeId, setRecipeId] = useState(null);
    const [recipeName, setRecipeName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientArr, setIngredientArr] = useState([]);
    const [stepStr, setStepStr] = useState('');
    const [stepArr, setStepArr] = useState([]);
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState('');

    const [preview, setPreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const fileInputChange = (selectedImage) => {
      setImageUrl(selectedImage);
      setPreview(selectedImage);
    };

    function handleRecipeNameChange(value) {
          setRecipeName(value)
      }

      function handleDescriptionChange(value) {
          setDescription(value)
      }
    
      function handleTimeChange(value) {
          setTime(value)
      }
    
      function handleIngredient(value) {
        setIngredientName(value)
      }

      function addIngredient() {
        setIngredientArr([
          ...ingredientArr,
          {id: nextId++, name: ingredientName}
        ]);
        setIngredientName('');
      }

      function handleStep(value) {
        setStepStr(value)
      }

      function addStep() {
        setStepArr([
          ...stepArr,
          {id: nextId++, name: stepStr}
        ]);
        setStepStr('');
      }
    
    useEffect(() => {
        try {
            RecipeService.get(EDIT_RECIPE_URL+id,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    setRecipeId(response.data.id)
                    setRecipeName(response.data.name)
                    setDescription(response.data.description)
                    setIngredientArr(response.data.ingredients.map(((ingredient, index) => ({id:index, name:ingredient}))))
                    setStepArr(response.data.steps.map((step, index) => ({id:index, name:step})))
                    setTime(response.data.time)
                    setImageUrl(response.data.imageUrl)
            })
        } catch(err) {
            setErrors('Recipe not found.');
        }
    }, [auth.accessToken, id])

    return (
        <div>
            <NavbarNoSearch />
            <UpdateRecipe 
                recipeId={recipeId}
                recipeName={recipeName}
                description={description}
                ingredientArr={ingredientArr}
                ingredientName={ingredientName}
                stepArr={stepArr}
                stepStr={stepStr}
                time={time}
                handleRecipeNameChange={handleRecipeNameChange}
                handleDescriptionChange={handleDescriptionChange}
                handleIngredient={handleIngredient}
                setIngredientArr={setIngredientArr}
                setStepArr={setStepArr}
                handleStep={handleStep}
                handleTimeChange={handleTimeChange}
                addIngredient={addIngredient}
                addStep={addStep}

                imageUrl={imageUrl}
                fileInputChange={fileInputChange}
                preview={preview}
                errors={errors}
                setErrors={setErrors}
                />
        </div>
    )
}