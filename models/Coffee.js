const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoffeeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: {
      type: String,
    },
    roast: {
      type: String,
    },
    origin: {
      type: String,
    },
    notes: {
      type: String,
    },
    song: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    brewMethod: {
      type: String,
    },
    ratio: {
      type: String,
    },
    time: {
      type: String, //will be in minutes?
    }
  },
  { timestamps: true }
)

const Coffee = mongoose.model("Coffee", CoffeeSchema);
module.exports = Coffee;