const mongoose = require("mongoose");

const notice = mongoose.Schema(
  {
    groups: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Group",
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = Notice = mongoose.model("Notice", notice);
