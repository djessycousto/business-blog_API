const Article = require("../model/Article");
// const path = require("path");
const { BadRequestError } = require("../error");
const cloudinary = require("cloudinary").v2;

const localData = require("../data.json");
const axios = require("axios");

const createArticle = async (req, res, next) => {
  try {
    console.log(req.body);

    req.body.createBy = req.user.userId; // Assign user ID from request
    const article = await Article.create(req.body);
    res.status(201).json({ article });
  } catch (error) {
    next(error);
  }
};

// to be edit to include sorting
const getAllArticle = async (req, res, next) => {
  try {
    // console.log(localData);

    const article = await Article.find();
    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

const getSingleArticle = async (req, res, next) => {
  // i need to add auth in here
  try {
    const { articleId } = req.params;
    const article = await Article.findOne({ _id: articleId }); // find article

    if (!article) {
      throw new BadRequestError("no such article exist");
    }
    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

// const articlePicture = (req, res) => {
//   res.send("Article picture");
// };

const articlePicture = async (req, res, next) => {
  console.log("article pic");

  const url =
    "https://res.cloudinary.com/dyavi52qr/image/upload/v1740063897/AdobeStock_239608659_Preview_1_ti5lfr.jpg";
  const isValid = /^(https?:\/\/[^\s]+(\.(?:png|jpg|jpeg|gif|webp)))$/.test(
    url
  );
  console.log(isValid, "isvalid"); // Should be true

  // using muller and cloudinary
  try {
    // check the file
    if (!req.file) {
      throw new BadRequestError("no file, please upload a file");
    }

    // Convert buffer to base64
    const fileStr = `data:image/jpeg;base64,${req.file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "article-pictures",
    });
    res
      .status(200)
      .json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    next(error);
  }
};

const editArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findOneAndUpdate(
      { _id: articleId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // check if not product

    if (!article) {
      throw new BadRequestError("error no article");
    }
    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findOne({ _id: articleId });

    if (!article) {
      throw new BadRequestError("No article found");
    }
    await article.deleteOne();
    res.status(204).json({ msg: "deleted" });
  } catch (error) {
    next(error);
  }
};

// the delete controller will be used to remove completetly
// but i will just move aside in before conplete delete after 30days is removed

module.exports = {
  createArticle,
  getAllArticle,
  getSingleArticle,
  articlePicture,
  editArticle,
  deleteArticle,
};
