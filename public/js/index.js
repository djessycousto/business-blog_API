import { fetchAllArticle } from "./fetch.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? `${window.location.origin}/api-blog/v1`
    : window.location.origin; // Keeps the domain in production

// navItems();
const categoryMap = {
  TECHNOLOGY: "Technology",
  STOCK: "Stock",
  HEALTH: "Health",
  AUTOMOBILE: "Automobile",
  Politics: "Politics",
  Business: "Business",
  GuestPosts: "Guest Posts",
  // Editors: "Editors",
};

// base URL

async function navItems() {
  const data = await fetchAllArticle();

  // Extract the enum keys
  const navCategories = data.map((article) => article.categories).flat();
  // Remove duplicates
  const navUniqKey = [...new Set(navCategories)];

  navUniqKey.sort();
  navUniqKey.unshift("Home");

  //   navUniqKey = navUniqKey.sort((a, b) => a - b);

  const baseUrl =
    window.location.hostname === "localhost"
      ? `${window.location.origin}/api-blog/v1`
      : window.location.origin; // Keeps the domain in production

  // Map enum keys to readable names
  const navbar = navUniqKey
    .map((enumKey) => {
      let categoryName = categoryMap[enumKey] || enumKey;

      return `
     <a class="links" href="${
       categoryName === "Home"
         ? `${baseUrl}/home`
         : `${baseUrl}/category/${categoryName}`
     }">
    <li>${categoryName}</li>
  </a>
        `;
    })
    .join("");

  const linksWrapper = document.querySelector(".links-wrapper");
  linksWrapper.innerHTML = navbar;
}

navItems();

//###############################################search
//======================  search init and redirect

document.fonts.ready.then(() => {
  document.body.classList.add("fonts-loaded");
});

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchInput = document.getElementById("search-input").value.trim();

  if (!searchInput) {
    return;
  }

  const queryParams = new URLSearchParams({ search: searchInput }).toString();
  window.location.href = `${baseUrl}/search?${queryParams}`;

  console.log(queryParams);
}); // okay

//======================  search on load

document.addEventListener("DOMContentLoaded", async () => {
  // Get the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get("search");

  // const categories = queryParams.get("categories");

  // Make the API request with the search parameters
  const response = await fetch(`/api-blog/v1/article/search?${queryParams}`);

  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }

  const data = await response.json();
  const { success, totalArticles, totalPages, currentPage, article, count } =
    data;

  // Call function to display the results
  displaySearchResults(article, searchTerm, success);
});

//======================  Display function search
function displaySearchResults(article, searchTerm, success) {
  const loader = document.getElementById("loader");
  const searchTitle = document.querySelector(".search-title header h1");

  if (!searchTitle) {
    return;
  }

  searchTitle.textContent = `Search for "${searchTerm}"`;
  // const resultsContainer = document.querySelector(".search-wrap");
  const resultsContainer = document.querySelector(".search-card_content");

  // if (!article || !article.length) {
  //   resultsContainer.innerHTML = ``;
  //   loader.style.display = "none"; // Hide loader after data is loaded
  //   resultsContainer.innerHTML = `<p>No articles found. Try adjusting your search criteria.</p>`;
  //   return;
  // }

  if (!article || article.length === 0) {
    loader.style.display = "none";
    resultsContainer.innerHTML = `<p>No articles found. Try adjusting your search criteria.</p>`;
    return;
  }

  const articleData = article
    .map((post) => {
      return `
    <div class="grid_card">
      <div class="grid_card-img">
        <img src="${post.articlePicture}" alt="${post.title}">
      </div>
      <div class="grid_card-text">
        <h2>${post.title}</h2>
        <span class="tag">${post.tags}</span>
        <p>${post.article} + ...</p>
        <a href="/category/article/${post._id}">Read more »</a>
      </div>
    </div>
  `;
    })
    .join("");
  loader.style.display = "none"; // Hide loader after data is loaded
  resultsContainer.innerHTML = "";
  resultsContainer.innerHTML = articleData;
}
