// src/components/BurgerMenu.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Burger = () => {
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    axios.get('https://jsondata-l2nh.onrender.com/db')
      .then(response => {
        setBurgers(response.data.burger);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Burger Menu</h1>
      {burgers.map(burger => (
        <div key={burger.id} className="burger-item">
          <h2>{burger.name}</h2>
          <img src={burger.images[0].sm} alt={burger.name} />
          <p>{burger.desc}</p>
          <h3>Ingredients:</h3>
          <ul>
            {burger.ingredients.map(ingredient => (
              <li key={ingredient.id}>
                <img src={ingredient.img} alt={ingredient.name} width="50" />
                {ingredient.name}
              </li>
            ))}
          </ul>
          <p>Price: ${burger.price}</p>
          <p>{burger.veg ? "Vegetarian" : "Non-Vegetarian"}</p>
        </div>
      ))}
    </div>
  );
};

export default Burger;
