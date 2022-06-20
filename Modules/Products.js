const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    filename: {
      type: String,
    },

    contentType: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("image", ProductsSchema);
