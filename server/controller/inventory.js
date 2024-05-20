import * as itemService from "../service/inventory.js";

const setSuccessRes = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorRes = (error, response) => {
  response.status(500);
  response.json(error);
};

/**
 * @desc creates a new Item and calls the setSuccess func on success and calls the setError func on failure
 */
export const post = async (request, response) => {
  try {
    let payload = request.body;
    let item = await itemService.saveItem(payload);
    setSuccessRes(item, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};

/**
 * @desc gets the whole item list
 */
export const getList = async (request, response) => {
  try {
    const itemList = await itemService.getList();
    setSuccessRes(itemList, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};

/**
 * @desc searches the item based on the query parameter passed
 */
export const index = async (request, response) => {
  try {
    
    const name = request.query.name;
    const query = {};
    if (name) {
      query.name = name;
    }
    // console.log(request.query, request.body, query);
    const itemGot = await itemService.findItem(query);
    setSuccessRes(itemGot, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};

/**
 * @desc gets the specific todo item based on the id
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const itemGot = await itemService.getItem(id);
    setSuccessRes(itemGot, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc upadates the spcific todo item based on the id parameter
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedItem = { ...request.body };
    updatedItem.id = id;
    const itemUpdated = await itemService.updateItem(updatedItem);
    setSuccessRes(itemUpdated, response);
  } catch (err) {
    console.log(err);
    setErrorRes(err, response);
  }
};

/**
 * @desc deletes the todo item based on the id parameter
 */
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const item = itemService.deleteItem(id);
    setSuccessRes({ message: "Item successfully deleted!" }, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};
