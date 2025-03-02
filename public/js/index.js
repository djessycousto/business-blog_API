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

  console.log(navCategories, "nav");

  // Remove duplicates
  const navUniqKey = [...new Set(navCategories)];

  navUniqKey.sort();
  navUniqKey.unshift("Home");
  //   navUniqKey = navUniqKey.sort((a, b) => a - b);

  console.log(navUniqKey, "unique enum keys");

  // Map enum keys to readable names
  const navbar = navUniqKey
    .map((enumKey) => {
      let categoryName = categoryMap[enumKey] || enumKey;

      return `
          <a class="links" href="">
            <li>${categoryName}</li>
          </a>
        `;
    })
    .join("");

  const linksWrapper = document.querySelector(".links-wrapper");
  linksWrapper.innerHTML = navbar;
}

navItems();
