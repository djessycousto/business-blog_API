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
      required: [true, "Please insert picture"],
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/.test(v);
        },
        message: "Please provide a valid image URL",
      },
    },
    categories: {
      type: [String], // Array of categories
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
      required: [true, "Please choose at least one category"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // views: {
    //   type: Number,
    //   default: 0,
    // },
    // likesCount: {
    //   type: Number,
    //   default: 0,
    // },
    // status: {
    //   type: String,
    //   enum: ["draft", "published"],
    //   default: "draft",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
