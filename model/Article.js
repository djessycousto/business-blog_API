const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      min: [4, "Please the title must have minimum 4 letter"],
    },

    subTitle: {
      type: String,
      // required: [true, "Please provide a title"],
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
          // return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/.test(v);
          return /^(https?:\/\/[^\s]+(\.(?:png|jpg|jpeg|gif|webp)))$/.test(v);
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
        "Politics",
        "Stock",
        "Technology",
        "Business",
      ],
      required: [true, "Please choose at least one category"],
    },

    tags: {
      type: [String], // Array of tags
      enum: [
        "Automobile",
        "Editors pick",
        "Guests Posts",
        "Health",
        "Must Read",
        "Politics",
        "Stock",
        "Technology",
        // Add more specific tags if needed
        "Guests Posts",
        "Innovation",
        "AI",
        "Business",
        "Lifestyle",
      ],
      default: [], // Optional: Empty array if no tags are selected
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
