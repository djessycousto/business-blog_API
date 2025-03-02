// const displaycartDOM = () => {};

const editorPickCartDOM = (data) => {
  const editorChoice = data
    .map((article) => {
      return `
      
       <div class="editor-pick_card">
           <div class="editor_card_text editor-pick-1">
              <a href=""> <span class="tag">${article.tags} | ${article.categories}</span> </a>
                  <p>Want a Career in Technology? Make This Your Secret Weapon</p>
          </div>
       </div>
      
      `;
    })
    .join("");
  const editorPickWrap = document.querySelector(".editor-pick-wrap");
  editorPickWrap.innerHTML = editorChoice;
};

const cartDOM = (data, sectionDom) => {
  const cards = data
    .map((article) => {
      return `


    <div class="grid_card_content">

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
    .join("");

  sectionDom.innerHTML = cards;
};

//<!-- ========= short post in image - latest technology =========== -->

const cartDOMTwoSection = (data, sectionDom) => {
  const cards = data
    .map((article) => {
      return `
  
  
    <div class="latest_card_content">

             <div class="latest_card-img">
                 <img src="${article.articlePicture}" alt="">
             </div>
                 <div class="latest_card-text">
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
    .join("");

  sectionDom.innerHTML = cards;
};

export { editorPickCartDOM, cartDOM, cartDOMTwoSection };
