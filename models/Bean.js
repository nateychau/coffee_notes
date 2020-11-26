const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roaster: {
      type: String,
    },
    roast: {
      type: String,
    },
    origin: {
      type: String,
    },
    price: {
      type: Number, 
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
)

const Bean = mongoose.model("Bean", BeanSchema);
module.exports = Bean;