import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      // setIsLoading(true);
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        // ...
      }
      const meals = await response.json();
      setLoadedMeals(meals);
      // setIsLoading(false);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        {
          /* console.log("rendering meal:", meal); */
        }
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
