const Article = require("../model/Article");

const path = require("path");
const { errorHandlerMiddleware } = require("../middleware/error-handler");
const { CustomAPIError } = require("../error/index");

const createArticle = async (req, res, next) => {
  try {
    req.body.createBy = req.user.userId; // Assign user ID from request

    if (!req.body.title || !req.body.article) {
      throw new CustomAPIError("Title and article content are required", 400);
    }

    const article = await Article.create(req.body);

    res.status(201).json({ article });
  } catch (error) {
    next(error); // Pass error to errorHandlerMiddleware
  }
};

const getAllArticle = async (req, res, next) => {
  try {
    const article = await Article.find();
    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

const getSingleArticle = async (req, res) => {
  // i need to add auth in here
  try {
    const { articleId } = req.params;
    const article = await Article.findOne({ _id: articleId }); // find article

    if (!article) {
      throw new CustomAPIError("no such article exist", 400);
    }
    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

const articlePicture = (req, res) => {
  res.send("Article picture");
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
      console.log("error no article");

      // throw new CustomAPIError("")
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
      console.log("no post find");
    }
    await article.deleteOne(); // remove is causing trouble find why????
    res.status(204).json({ msg: "deleted" }); // base on status if 204 front end send succes
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
