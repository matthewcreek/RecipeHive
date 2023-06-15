import React, { useState } from 'react';
import {FaTimes} from 'react-icons/fa';

import clock from '../../images/clock.png'
import ExpandedCard from './ExpandedCard';

export default function RecipeCard({id, name, description, imageUrl, steps, ingredients, title, time, deleteRecipe}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const clickViewRecipe = () => {
    setIsExpanded(true);
  }

  function closeViewRecipe() {
    setIsExpanded(false);
  }

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={name} />
      <div className="recipe-title">
        <h2>{name}</h2>
      </div>
      <div className="recipe-details">
        <div className='recipe-details-element'>
          <p>{description}</p>
        </div>
        {/* <div className="recipe-time"> */}
        <div className='recipe-details-element'>
          <img src={clock} className="clockIcon" alt="clock" />
          <p>{time}</p>
        </div>
        {/* <div className='recipe-details-element'>
        </div> */}
        {/* </div> */}
      </div>
      <div>
        <button className="view-button" onClick={clickViewRecipe}>View Recipe</button>
      </div>
      {isExpanded && ( 
        <div className='popup-view'>
          <div className='popup'>
            <button className='close-button' onClick={closeViewRecipe}><FaTimes/></button>
            <ExpandedCard 
              deleteRecipe={deleteRecipe}
              id={id}
              imageUrl={imageUrl}
              name={name}
              title={title}
              description={description}
              ingredients={ingredients}
              steps={steps}
              time={time}
              closeViewRecipe={closeViewRecipe} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
