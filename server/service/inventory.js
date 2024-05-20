import Item from "../model/inventory.js";

/**
 * @desc gets the ingredient list
 */
export const getList = async () => {
  let fullList = await Item.find();
  return fullList;
};

/**
 * @desc created a new ingredient
 */
export const saveItem = (item) => {
  //   console.log("in service", item);
  const itemNew = new Item(item);
  return itemNew.save();
};

/**
 * @desc gets the ingredient based on the query params passed
 */
export const findItem = async (query) => {
  const params = { ...query };
  const itenResult = Item.find(params).exec(); //find does an database query, returns the result as promise
  return itenResult;
};

/**
 * @desc gets the specific ingredient item
 */
export const getItem = (id) => {
  const itemGot = Item.findById(id).exec();
  return itemGot;
};

/**
 * @desc update the specific ingredient
 */
export const updateItem = async (item) => {
  const itemUpdated = Item.findByIdAndUpdate(item.id, item, {
    new: true,
  }).exec();
  return itemUpdated;
};

/**
 * @desc deletes the specific ingredient
 */
export const deleteItem = async (id) => {
  let itemDeleted = await Item.findByIdAndDelete(id).exec();
  return itemDeleted;
};
