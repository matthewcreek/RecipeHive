import React, { useState } from "react";
import { Link } from 'react-router-dom';
import recipeService from '../../../services/RecipeService';

const DELETE_RECIPE_URL = 'api/recipe/delete/';

export default function ExpandedCard({closeViewRecipe, deleteRecipe, id, name, description, imageUrl, steps, ingredients, title, time}) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState('');

  const listedIngredients = (ingredient, number) => (
    <li key={number}>{ingredient}</li>
  );

  const listedDirections = (step, number) => (
    <li key={number}>{step}</li>
  );

  function openConfirmWindow() {
    setIsExpanded(true);
  }

  function closeConfirmWindow() {
    setIsExpanded(false);
  }

  async function handleDelete() {
    try {
      await recipeService.get(DELETE_RECIPE_URL+id);
      closeViewRecipe();
      deleteRecipe(id);
    } catch(err) {
      setErrors('Recipe not found.');
    }
  }

  return (
    <>
      <div className="expanded-card">
        {errors && <p className="errors">{errors}</p>}
        <img className="expanded-image" src={imageUrl} alt={name} />
        <div className="expanded-title">
          <h2>{name}</h2>
        </div>
        <div className="expanded-details">
          <p>-{description}-</p>
        </div>
        <div className="expanded-ingredients">
          <h3>Ingredients:</h3>
          <div className="list-items">
            <ul>
              {ingredients.map(listedIngredients)}
            </ul>
          </div>
        </div>
        <div className="expanded-directions">
          <h3>Steps:</h3>
          <div className="list-items">
            <ol>
              {steps.map(listedDirections)}
            </ol>
          </div>
        </div>
        <div className="expanded-time">
          <h3>Time to Cook:</h3>
          <p>-{time}-</p>
        </div>
        <div className="expanded-buttons">
          <Link className="edit-button" to={`/update/${id}`}>Edit</Link>
          <button className="delete-button" onClick={openConfirmWindow}>Delete</button>
        </div>
      </div>
      {isExpanded && (
        <div className="delete-confirm">
          <div className="delete-elements">
            <p className="delete-message">Are you sure you want to delete this recipe?</p>
            <div className="delete-buttons">
              <button className="delete-cancel" onClick={closeConfirmWindow}>Cancel</button>
              <button className="delete-proceed" onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
