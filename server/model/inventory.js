import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: "The name field is required",xws
    },
    quantity: {
      type: String,
    },
    unit: {
      type: String,
    },
    purchasedDate: {
      type: Date,
      default: Date.now,
    },
    usedBy: {
      type: Date,
    },
    nutrition: {
      type: String,
    },
    category: {
      type: String,
    },
    toBuy: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

schema.virtual("id", () => this._id.toHexString()); //creating vitual properties of schema using this function
schema.set("toJSON", { virtuals: true });

const model = mongoose.model("item", schema);
export default model;
