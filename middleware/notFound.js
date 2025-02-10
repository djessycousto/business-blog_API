const notFound = async (req, res) => {
  // console.log(req);

  try {
    res.status(404).json({ msg: "Route not found" });
  } catch (error) {
    console.log(error);
  }
};

//  need to be done

module.exports = notFound;
