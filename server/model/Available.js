import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    Food: {
      type: String,
      // required: "The name field is required",xws
    },
    Calories: {
      type: String,
    },
    Servings: {
      type: String,
    },
  },
  { versionKey: false, collection: "Dishes" }
);

schema.virtual("id", () => this._id.toHexString()); //creating vitual properties of schema using this function
schema.set("toJSON", { virtuals: true });

const model = mongoose.model("Dishes", schema);
export default model;
