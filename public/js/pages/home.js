import {
  editorPickCartDOM,
  cartDOM,
  cartDOMTwoSection,
} from "../pages/displayDom.js";

import { fetchAllArticle } from "../fetch.js";

// header

// const cardHeaderTitle = document.querySelector(".card-header-title");

const baseUrl =
  window.location.hostname === "localhost"
    ? `${window.location.origin}/api-blog/v1`
    : window.location.origin; // Keeps the domain in production

//=============== heroSection ===================//

// fetch data for home page
async function hero() {
  const data = await fetchAllArticle();

  //   4 articles 1 main and 3 sub
  const heroArticle = [
    // data.filter(
    //   (article) => console.log(article.categories === "Technology") // need to add featured:true for hero
    // ),
    // data.filter((article) => {
    //   return article.categories.includes("Technology");
    // }), // need to add featured:true for hero
    ...data
      .filter((article) => article.categories.includes("Technology"))
      .slice(0, 1),
    ...data
      .filter((article) => article.categories.includes("Stock"))
      .slice(0, 1),
    ...data
      .filter((article) => article.categories.includes("Health"))
      .slice(0, 1),
    ...data
      .filter((article) => article.categories.includes("Technology"))
      .slice(0, 1),
  ];

  //   i can implement a logic that pick the most liked,  recent, viewed or other feature

  // hero display split in 2

  const articleLeftHot = heroArticle[0];
  // Base

  //   left hot topic
  const heroArticleLeft = `
                        <div class="hero-grid-1">
                        <img src="${articleLeftHot.articlePicture}" alt="title">
                        <div class="hero-grid-1_container">
                            <span class="tag">${articleLeftHot.tags}</span>
                            <a href="${baseUrl}/category/article/${articleLeftHot._id}">
                           <p>${articleLeftHot.title}</p></a>
                            <span class="createdAt">June 28, 2021 </span>
                        </div>
                    </div>`;

  // left side

  const articleRightHot = heroArticle.slice(1, heroArticle.length);

  const heroArticleRight = articleRightHot
    .map((articleTopic) => {
      const { _id, title, articlePicture, tags, subTitle, article } =
        articleTopic;

      return `                    <!--grid img right  -->

             <div class="hero-grid_card">
                    <div class="hero-grid_card_content test-1">

                                <div class="hero-gid_card-img">
                                    <img src="${articlePicture}" alt="">
                                </div>
                                <div class="hero-gid_card-text">
                                    <span class="tag">${tags}</span>

                                    <a href="${baseUrl}/category/article/${_id}">
                           <p>${title}</p></a>
                                    <span class="createdAt">June 28, 2021 </span>
                                </div>
            </div>
                    </div>
      `;
    })
    .join("");

  const hero = `
  ${heroArticleLeft}
           <div class="hero-grid-2">
             ${heroArticleRight}
             </div>
  `;

  const heroWrapperDom = document.querySelector(".hero-wrapper");
  heroWrapperDom.innerHTML = hero;

  //   const { id, title, articlePicture, tags, subTitle, article } =

  ////////====================   ////////====================
  ////////====================
  ////////====================
  ////////====================
  ////////====================
  ////////====================
  ////////==================== what to do with full api
  //   console.log(heroArticle.id);
  //   const { id, title, articlePicture } = heroArticle;
  //   console.log(articlePicture);

  // reduce

  //   const latestEntry = data.reduce((latest, current) => {
  //     return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
  //   });
  //   console.log(latestEntry);
}
hero();

//=============== authorPick Section ===================//

async function authorPickSection() {
  const data = await fetchAllArticle();
  const authorPick = data.filter((article) => {
    return article.tags.includes("Editors pick");
  });

  const editorPick = authorPick.slice(0, 6);

  // call display
  editorPickCartDOM(editorPick);
}
authorPickSection();

//=============== Card Stock ===================//

async function card(category, classItem, headerSelector) {
  const data = await fetchAllArticle();
  const cards = data.filter((article) => {
    // return article.categories === "Stock";
    return article.categories.includes(category);
  });

  const cardsTemplate = cards.slice(0, 3);

  headerTitleAndLink(category, headerSelector);

  // call display
  const stockCardsWrapper = document.querySelector(classItem);
  cartDOM(cardsTemplate, stockCardsWrapper);
}

// stock display
card("Stock", ".grid_card_content-wrap", ".cardheaderViewAll");
// politic display
card("Politic", ".politic-container", ".cardheaderViewAll-politics");

async function cardTwoSection(category, headerSelector) {
  const data = await fetchAllArticle();
  const cards = data.filter((article) => {
    return article.categories.includes(category);
  });

  const cardsTemplate = cards.slice(0, 2);

  // section // card name
  const cardHeaderTitle = document.querySelector(headerSelector + " h1");
  const cardHeaderViewAll = document.querySelector(headerSelector + " span");

  if (cardHeaderTitle) {
    cardHeaderTitle.textContent = "Latest " + category;
  }

  if (cardHeaderViewAll) {
    const ViewAllLink = document.createElement("a");
    ViewAllLink.setAttribute("href", `${baseUrl}/category/${category}`);
    ViewAllLink.textContent = "View All";

    // Clear previous content and append the new link
    cardHeaderViewAll.innerHTML = "";
    cardHeaderViewAll.appendChild(ViewAllLink);
  }

  // call display
  const CardsWrapper = document.querySelector(".latest_card_content-wrap");
  cartDOMTwoSection(cardsTemplate, CardsWrapper);
}
cardTwoSection("Technology", ".cardheaderViewLatest-technology");

//================ right and left article automobile and health
async function twoArticle(category, classItem, headerSelector) {
  const data = await fetchAllArticle();
  const cards = data.filter((article) => {
    return article.categories.includes(category);
  });

  const cardsTemplate = cards.slice(0, 1);
  const { articlePicture, tags, categories } = cardsTemplate[0];

  headerTitleAndLink(category, headerSelector);

  // call display
  const CardsImg = document.querySelector(`${classItem} .grid_card-img img`);
  const CardsTag = document.querySelector(`${classItem} .grid_card-text .tag`);
  const CardsH2 = document.querySelector(`${classItem} .grid_card-text h2`);
  const CardsParagraph = document.querySelector(
    `${classItem} grid_card-text p`
  );

  CardsImg.src = articlePicture;
  CardsTag.textContent = tags;
  CardsH2.textContent = `${categories}`;

  //
}

twoArticle(
  "Health",
  ".doublecardSection-left-content",
  // ".cardheaderViewLatest-technology"
  ".doublecardSection-title-left"
);
twoArticle(
  "Automobile",
  ".doublecardSection-right-content",
  ".doublecardSection-right-header"
);

//===================== must read

async function mustRead(category, headerSelector) {
  const data = await fetchAllArticle();
  const cards = data.filter((article) => {
    return article.tags.includes(category);
  });

  const cardsTemplate = cards.slice(0, 3);

  const mustCardsWrapper = document.querySelector(".must-read-article-wrap");
  mustCardsWrapper.innerHTML = cardsTemplate
    .map((article) => {
      return `
  
   <div class="card-article-sections_content must-read-article-section-content">

                                <div class="grid_card-img">
                                    <img src="${article.articlePicture}" alt="">
                                </div>
                                <div class="grid_card-text">
                                    <span class="tag">Stock Market</span>
                                    <h2>What Your Relationship With Stock Market Says About You</h2>
                                    <span class="createdAt"> <span>author name</span> June 28, 2021 </span>
                                    <p>Cursus iaculis etiam in In nullam donec sem sed consequat scelerisque nibh amet,
                                        massa
                                        egestas risus, gravida vel amet, imperdiet ...</p>
                                </div>
                            </div>

  
  `;
    })
    .join(" ");

  headerTitleAndLink(category, headerSelector);

  // call display
}

// stock display
mustRead("Must Read", ".must-read-header");

//  headerTitleAndLink and link for view all
function headerTitleAndLink(category, headerSelector) {
  // section // card name
  const cardHeaderTitle = document.querySelector(headerSelector + " h1");
  const cardHeaderViewAll = document.querySelector(headerSelector + " span");

  if (cardHeaderTitle) {
    cardHeaderTitle.textContent = category;
  }

  if (cardHeaderViewAll) {
    const ViewAllLink = document.createElement("a");
    ViewAllLink.setAttribute("href", `${baseUrl}/category/${category}`);
    ViewAllLink.textContent = "View All";

    // Clear previous content and append the new link
    cardHeaderViewAll.innerHTML = "";
    cardHeaderViewAll.appendChild(ViewAllLink);
  }
}

// right and left

// i need to add sorting by latest

// const section2Posts = [
//   ...blogPosts.filter((post) => post.category === "A").slice(0, 2),
//   ...blogPosts.filter((post) => post.category === "B").slice(0, 3),
//   ...blogPosts.filter((post) => post.category === "C").slice(0, 1),
// ];

// console.log("Section 2 Posts:", section2Posts);

//latest

// const data = {
//     data: [
//       { id: '1', title: 'First', categories: 'Technology', createdAt: '2025-01-01' },
//       { id: '2', title: 'Second', categories: 'Politics', createdAt: '2025-02-01' },
//       { id: '3', title: 'Third', categories: 'Health', createdAt: '2025-03-01' }
//     ]
//   };

//   const latestEntry = data.data.reduce((latest, current) => {
//     return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
//   });
//   console.log(latestEntry);
