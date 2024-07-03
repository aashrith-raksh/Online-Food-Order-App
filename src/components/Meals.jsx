import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";
import useFetch from "./hooks/useFetch";

export default function Meals() {

  const {data: loadedMeals, isLoading, error} = useFetch("http://localhost:3000/meals", []);

  if(isLoading){
    return <p className="center">Fetching Meals...</p>
  }
  if(error){
    return <p className="center">{error}</p>
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
