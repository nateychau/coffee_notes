const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
    },
    brewMethod: {
      type: String,
    },
    ratio: {
      type: String,
    },
    time: {
      type: String, //will be in minutes?
    },
    beanId: {
      type: Schema.Types.ObjectId,
      ref: "Bean",
      required: true,
    }
  },
  { timestamps: true }
)

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;