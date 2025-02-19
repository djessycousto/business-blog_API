const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      min: [4, "Please the title must have minimum 4 letter"],
    },
    article: {
      type: String,
      required: [true, "Please provide a title"],
      min: [4, "Please the title must have minimum 4 letter"],
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      // type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articlePicture: {
      type: String,
      // default:"/upload/example" // no default
    },
    categories: {
      type: String,
      enum: [
        "Automobile",
        "Editors",
        "Guests Posts",
        "Health",
        "Must",
        "Politics",
        "Stock",
        "Technology",
      ],
      default: "Guests Posts",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
