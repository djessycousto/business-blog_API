const baseUrl =
  window.location.hostname === "localhost"
    ? `${window.location.origin}/api-blog/v1`
    : window.location.origin; // Keeps the domain in production

const editorPickCartDOM = (data) => {
  const editorChoice = data
    .map((article) => {
      return `
      
       <div class="editor-pick_card">
           <div class="editor_card_text editor-pick-1">
              <a href=""> <span class="tag">${article.tags} | ${article.categories}</span> </a>
                     <a href="${baseUrl}/category/article/${article._id}">
 <p>${article.title}</p></a>
          </div>
       </div>
      
      `;
    })
    .join("");
  const editorPickWrap = document.querySelector(".editor-pick-wrap");
  editorPickWrap.innerHTML = editorChoice;
};

//  crop text

const cartDOM = (data, sectionDom) => {
  const cards = data
    .map((article) => {
      // date
      const date = new Date(article.createdAt);
      const month = date.getMonth();
      const day = date.getDay();
      const year = date.getFullYear();
      return `


    <div class="grid_card_content">

        <div class="grid_card-img">
            <img src="${article.articlePicture}" alt="">
        </div>
       <a href="${baseUrl}/category/article/${
        article._id
      }"> <div class="grid_card-text">
            <span class="tag">${article.tags}</span>
            <h2>${article.title}</h2>
            <span class="createdAt"> <span>${
              article.createBy
            }</span> 0${day}/0${month}/${year} </span>
            <p>${article.article.substring(0, 150)}[...]</p>
        </div></a>
    </div>

             
                        

        
        `;
    })
    .join("");

  sectionDom.innerHTML = cards;
};

//<!-- ========= short post in image - latest technology =========== -->

const cartDOMTwoSection = (data, sectionDom) => {
  const cards = data
    .map((article) => {
      const date = new Date(article.createdAt);
      const month = date.getMonth();
      const day = date.getDay();
      const year = date.getFullYear();

      const trimArticle =
        article.article > 150
          ? `${article.article.substring(0, 80)}[...]`
          : article.article;
      return `
  
  
    <div class="latest_card_content">

             <div class="latest_card-img">
                 <img src="${article.articlePicture}" alt="">
             </div>
               
             <a href="${baseUrl}/category/article/${
        article._id
      }"><div class="latest_card-text">
                    <span class="tag">Stock Market</span>
                    <h2>What Your Relationship With Stock Market Says About You</h2>
                    <span class="createdAt"> <span>${
                      article.createBy
                    }</span>0${day}/0${month}/${year} </span>
                    <p>${article.article.substring(0, 150)}[...]</p>
            
     </div>
     </div>
  

  
               
                          
  
          
          `;
    })
    .join("");

  sectionDom.innerHTML = cards;
};

export { editorPickCartDOM, cartDOM, cartDOMTwoSection };
