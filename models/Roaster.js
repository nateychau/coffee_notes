const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoasterSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  }, 
  { timestamps: true}
)

const Roaster = mongoose.model("Roaster", RoasterSchema);
module.exports = Roaster;