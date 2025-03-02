import { fetchAllArticle } from "./fetch.js";

// async function navItems() {
//   const data = await fetchAllArticle();

//   let navCategories = data.filter((article) => {

//     return article.categories;
//   });

//   // Use Set to get unique categories
//   const navUniqKey = [...new Set(navCategories)];
//   console.log(navUniqKey, "unique categories");

//   const navbar = navUniqKey
//     .map((navItem) => {
//       return `
//        <a class="links" href="">
//                         <li>${categories}</li>
//                     </a>

//     `;
//     })
//     .join("");

//   const linksWrapper = document.querySelector(".links-wrapper");
//   linksWrapper.innerHTML = navbar;
// }

// navItems();

const categoryMap = {
  TECHNOLOGY: "Technology",
  STOCK: "Stock",
  HEALTH: "Health",
  AUTOMOBILE: "Automobile",
};

async function navItems() {
  const data = await fetchAllArticle();

  // Extract the enum keys
  const navCategories = data.map((article) => article.categories);

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
