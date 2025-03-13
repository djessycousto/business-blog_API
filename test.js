const axios = require("axios");

axios
  .get("/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error fetching data", error);
  });

// document.getElementById("search-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const searchInput = document.getElementById("search-input").value.trim();
//   console.log(searchInput);

//   // Build query params dynamically
//   const queryParams = new URLSearchParams({
//     search: searchInput, // This acts as both the search term and category
//     page: 1,
//     limit: 5,
//   });

//   try {
//     const response = await fetch(`/api-blog/v1/article/search?${queryParams}`);
//     const dataSearch = await response.json();
//     console.log(dataSearch); //

//     if (dataSearch.success === true) {
//       // console.log(dataSearch.article, "dataSearch.article");

//       displayResults(dataSearch.article);
//     } else {
//       document.getElementById("results").innerHTML = "No results found.";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// });

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchInput = document.getElementById("search-input").value.trim();
  // console.log(searchInput);

  if (!searchInput) {
    return;
  }

  const queryParams = new URLSearchParams({ search: searchInput }).toString();
  window.location.href = `${baseUrl}/search?${encodeURIComponent(queryParams)}`;
});

// document.addEventListener("DOMContentLoaded", async () => {
//   // Get the query parameters from the URL
//   const queryParams = new URLSearchParams(window.location.search);
//   // const searchTerm = queryParams.get("search");
//   // console.log(searchTerm);

//   // const categories = queryParams.get("categories");

//   // Make the API request with the search parameters
//   const response = await fetch(`/api-blog/v1/article/search?${queryParams}`);
//   const data = await response.json();

//   // Call function to display the results
//   displayResults(data.article);
// });

//
// Display function for results
// function displayResults(articles) {
//   // const resultsContainer = document.getElementById("search-content");
//   const resultsContainer = document.querySelector(".search-container");

//   if (!articles) {
//     resultsContainer.innerHTML = "No articles found.";
//     return;
//   }

//   const searchImage = document.querySelector(".search-card_img img");
//   const searchTitle = document.querySelector(".search-card_text h2 ");

//   // searchTitle.textContent = tags;

//   resultsContainer.innerHTML = articleToDom;
// }

displayResults();

//)

console.log("hello world");
