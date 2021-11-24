import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card/Card";
import MealItem from "../Meals/MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const {
    isLoading,
    error: httpError,
    sendRequest: fetchAvailableMeals
  } = useHttp();

  useEffect(() => {
    const loadAvailableMeals = (data) => {
      const mealItems = [];
      for (const key in data) {
        mealItems.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }
      setAvailableMeals(mealItems);
    };

    fetchAvailableMeals(
      {
        url: "https://react-http-14311-default-rtdb.firebaseio.com/meals.json"
      },
      loadAvailableMeals
    );
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card className={classes.loading}>Loading available meals...</Card>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.meals}>
        <Card className={classes.error}>{httpError}</Card>
      </section>
    );
  }

  let mealItems = availableMeals.map((item) => (
    <MealItem
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
