const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Roaster = require('./Roaster');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    roasters: [String],
    // roasters: [
    //   {
    //     type: mongoose.Types.ObjectId, 
    //     ref: 'Roaster'
    //   }
    // ], 
  }, 
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;