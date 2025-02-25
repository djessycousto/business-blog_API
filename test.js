const axios = require("axios");

axios
  .get("/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error fetching data", error);
  });
