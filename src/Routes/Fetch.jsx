import { useState, useEffect } from 'react';

import axios from 'axios'

const Fetch = () => {
  const [meals, setMeals] = useState([])
  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => {
        setMeals(res.data.meals);
      })
  }, [])
  
  return (
    <div>
      {meals.map((meal) => (
      <img key={meal.id} src={meal.image} alt={meal.name} width={400}/>
      ))}
    </div>
  );
};

export default Fetch;
