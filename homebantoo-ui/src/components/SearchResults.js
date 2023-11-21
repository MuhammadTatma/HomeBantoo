// components/SearchResults.js
import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <img src={result.image} alt={result.title} />
            <p>Title: {result.title}</p>
            <p>Likes: {result.likes}</p>
            <p>Missed Ingredient Count: {result.missedIngredientCount}</p>
            <h3>Missed Ingredients:</h3>
            <ul>
              {result.missedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
            <h3>Used Ingredients:</h3>
            <ul>
              {result.usedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
