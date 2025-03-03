import { fetchAllArticle } from "./fetch.js";

// navItems();
const categoryMap = {
  TECHNOLOGY: "Technology",
  STOCK: "Stock",
  HEALTH: "Health",
  AUTOMOBILE: "Automobile",
  Politics: "Politics",
  Business: "Business",
};

async function navItems() {
  const data = await fetchAllArticle();

  // Extract the enum keys
  const navCategories = data.map((article) => article.categories).flat();

  // Remove duplicates
  const navUniqKey = [...new Set(navCategories)];

  navUniqKey.sort();
  navUniqKey.unshift("Home");

  console.log(navUniqKey, "navUniqKey");

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
         : `${baseUrl}/category/${categoryName.toLowerCase()}`
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
