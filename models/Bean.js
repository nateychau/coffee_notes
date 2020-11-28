const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    roaster: {
      type: String,
    },
    // roasterId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Roaster",
    // },
    roast: {
      type: String,
    },
    origin: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
)

const Bean = mongoose.model("Bean", BeanSchema);
module.exports = Bean;