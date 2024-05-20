import * as mealService from "../service/meal.js";
import moment from "moment";

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorResponse = (error, response) => {
  console.log("error");
  response.status(500);
  response.json(error);
};

/**
 * @desc creates a new meal and calls the setSuccess func on success and calls the setError func on failure
 */
export const post = async (request, response) => {
  try {
    let payload = request.body;
    let item = await mealService.saveMeal(payload);
    setSuccessResponse(item, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

/**
 * @desc gets the whole item list
 */
export const getList = async (request, response) => {
  try {
    const mealList = await mealService.getList();
    setSuccessResponse(mealList, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

/**
 * @desc searches the item based on the query parameter passed
 */
export const index = async (request, response) => {
  try {
    const name = request.query.dish;
    const query = {};
    if (name) {
      query.dish = name;
    }
    console.log(request.query, request.body, request.params, query);
    const meal = await mealService.findMeal(query);
    setSuccessResponse(meal, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

/**
 * @desc gets the specific meal item based on the id
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    console.log(id, request.params);
    const meal = await mealService.getMeal(id);
    setSuccessResponse(meal, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
/**
 * @desc gets all based on the date
 */
export const getListByDate = async (request, response) => {
  try {
    const date = request.query.date;
    const query = {};
    if (date) {
      query.updateDate = date;
    }
    // console.log(
    //   "in controller",
    //   request.body,
    //   request.params,
    //   request.query,
    //   query
    // );
    const mealList = await mealService.getMeals(query);
    setSuccessResponse(mealList, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// var from = new Date('2014-05-18T20:00:00.000Z');
// var to = new Date('2014-05-19T20:00:00.000Z');

// db.collection.find({startTime: {$gt: from, $lt:to}});

/**
 * @desc upadates the spcific todo item based on the id parameter
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedMeal = { ...request.body };
    updatedMeal.id = id;
    const mealUpdated = await mealService.updateMeal(updatedMeal);
    setSuccessResponse(mealUpdated, response);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};

/**
 * @desc deletes the todo item based on the id parameter
 */
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const meal = mealService.deleteMeal(id);
    setSuccessResponse({ message: "Meal successfully deleted!" }, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

/**
 * @desc gets the whole item list
 */
export const getAvailableList = async (request, response) => {
  try {
    const mealList = await mealService.getAvailableList();
    setSuccessResponse(mealList, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
