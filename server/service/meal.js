import Meal from "../model/meal.js";
import Dishes from "../model/Available.js";
import moment from "moment";

/**
 * @desc gets the meal list
 */
export const getList = async () => {
  let fullList = await Meal.find();
  return fullList;
};

/**
 * @desc created a new meal
 */
export const saveMeal = (meal) => {
  //   console.log("in service", meal);
  const mealNew = new Meal(meal);
  return mealNew.save();
};

/**
 * @desc gets the meal based on the query params passed
 */
export const findMeal = async (query) => {
  const params = { ...query };
  const itenResult = Meal.find(params).exec(); //find does an database query, returns the result as promise
  return itenResult;
};

/**
 * @desc gets the specific meal
 */
export const getMeal = (id) => {
  const mealGot = Meal.findById(id).exec();
  return mealGot;
};

/**
 * @desc get all with the specfied date
 */
export const getMeals = (query) => {
  let from = new Date(query.updateDate);
  // let temp = moment(query.updateDate).add("1", "days");
  let to = new Date(query.updateDate).setDate(from.getDate() + 1);
  // let to = new Date(temp);
  const params = {
    updateDate: {
      // $eq: from,
      $gte: from,
      $lt: to,
    },
  };
  console.log(params, "f", from, "t", to);
  const itemResult = Meal.find(params).exec(); //find does an database query, returns the result as promise
  console.log("in service", itemResult);
  return itemResult;
};

/**
 * @desc update the specific meal
 */
export const updateMeal = async (meal) => {
  const mealUpdated = Meal.findByIdAndUpdate(meal.id, meal, {
    new: true,
  }).exec();
  return mealUpdated;
};

/**
 * @desc deletes the specific meal
 */
export const deleteMeal = async (id) => {
  let mealDeleted = await Meal.findByIdAndDelete(id).exec();
  return mealDeleted;
};

/**
 * @desc gets the meal list
 */
export const getAvailableList = async () => {
  let fullList = await Dishes.find();
  return fullList;
};
