// fetch data for home page

async function fetchAllArticle() {
  try {
    const response = await fetch("http://localhost:8080/api-blog/v1/article");
    const data = await response.json();
    const { localData } = data;
    // console.log(localData.data);
    const Articles = localData.data;
    return Articles;
  } catch (error) {
    console.log(error);
  }
}

// hero

async function hero() {
  const data = await fetchAllArticle();
  //   console.log(typeof data.data.data, data);

  //   const articles = Array.from(data);
  //   console.log(data);

  //   4 articles 1 main and 3 sub
  const heroArticle = [
    ...data.filter(
      (article) => console.log(article.categories === "Technology") // need to add featured:true for hero
    ),
    ...data.filter((article) => article.categories === "Stock").slice(0, 1),
    ...data.filter((article) => article.categories === "Health").slice(0, 1),
    ...data
      .filter((article) => article.categories === "Technology")
      .slice(0, 2),
  ];

  //   i can implement a logic that pick the most liked,  recent, viewed or other feature

  // hero display split in 2

  const articleLeftHot = heroArticle[0];
  //   left hot topic
  const heroArticleLeft = `
                        <div class="hero-grid-1">
                        <img src="${articleLeftHot.articlePicture}" alt="title">
                        <div class="hero-grid-1_container">
                            <span class="tag">${articleLeftHot.tags}</span>
                            <p>Want a Career in Technology? Make This Your Secret Weapon</p>
                            <span class="createdAt">June 28, 2021 </span>
                        </div>
                    </div>`;

  // left side

  const articleRightHot = heroArticle.slice(1, heroArticle.length);

  const heroArticleRight = articleRightHot
    .map((articleTopic) => {
      const { id, title, articlePicture, tags, subTitle, article } =
        articleTopic;

      return `                    <!--grid img right  -->

             <div class="hero-grid_card">
                    <div class="hero-grid_card_content test-1">

                                <div class="hero-gid_card-img">
                                    <img src="${articlePicture}" alt="">
                                </div>
                                <div class="hero-gid_card-text">
                                    <span class="tag">${tags}</span>
                                    <p>${title}</p>
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
  console.log();
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

  console.log(heroArticle);
}

hero();

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
