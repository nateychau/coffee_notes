const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songs: [{
      song: {
        type: String,
      },
      beanId: {
        type: Schema.Types.ObjectId,
        ref: "Bean",
        required: true,
      }
    }],
    accessToken: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

const Songs = mongoose.model("Song", SongSchema);
module.exports = Songs;