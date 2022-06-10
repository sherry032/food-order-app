import { useEffect } from "react";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem"
import Card from "../UI/Card";
import useHttp from "../helpers/useHttp";

const AvailableMeals = () => {
  const {meals, dataHasError, isLoading, sendRequest} = useHttp()
  useEffect(()=>{
    sendRequest(`https://moviedata-675bb-default-rtdb.firebaseio.com/meals.json`)
  }, [sendRequest])
  let renderContent
  if(isLoading && !dataHasError) renderContent = <li>Loading..</li>
  if(!isLoading && !dataHasError) renderContent = meals.map(meal => <MealItem id={meal.id} price={meal.price} key={meal.id} description={meal.description} name={meal.name}/>)
  if(!isLoading && dataHasError) renderContent = <li>Meal data can not be found</li>
return(
    <section className={classes.meals}>
    <Card>
    <ul>
        {renderContent}
    </ul>
    </Card>
    </section>

)
}

export default AvailableMeals