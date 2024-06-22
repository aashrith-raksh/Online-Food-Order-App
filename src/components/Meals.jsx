import { useEffect } from "react";
import { useState } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMeals(){
        // setIsLoading(true);
        const response = await fetch("http://localhost:3000/meals");

        if(!response.ok){
            // ...
        }
        const meals = await response.json();
        setLoadedMeals(meals);
        // setIsLoading(false);


    }


    fetchMeals();
  },[])

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
