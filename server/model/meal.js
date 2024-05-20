import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    dish: {
      type: String,
      // required: "The name field is required",xws
    },
    quantity: {
      type: String,
    },
    calorie: {
      type: String,
    },
    updateDate: {
      type: Date,
    },
    foodTime: {
      type: String,
    },
  },
  { versionKey: false }
);

schema.virtual("id", () => this._id.toHexString()); //creating vitual properties of schema using this function
schema.set("toJSON", { virtuals: true });

const model = mongoose.model("meal", schema);
export default model;
