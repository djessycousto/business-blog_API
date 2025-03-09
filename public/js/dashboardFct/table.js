import { fetchEditData } from "./edit.js";
import { fetchAllArticle } from "../fetch.js";

let pages = Array.from(document.querySelectorAll(".page"));

const tableBodyDOM = document.querySelector(".tbody");

document.addEventListener("DOMContentLoaded", async () => {
  const forUser = true; // Set this dynamically based on user selection or context
  const article = await fetchAllArticle();
  displayData(article);
}); // done all posts

//===========dash state page table display

//=========== selecting all edit btn

const addFormDisplay = document.querySelector(". add-cont. form-title");
const editFormDisplay = document.querySelector(".editformpost .editformpost");
console.log(editFormDisplay, "edit form display");

let isEditMode = false;

// Add event listeners for edit buttons
// const addEditListeners = () => {
//   document.querySelectorAll(".edit-btn").forEach((editBtn) => {
//     editBtn.addEventListener("click", (e) => {
//       // e.preventDefault();

//       if (e.target.classList.contains("edit-btn")) {
//         isEditMode = true; // We're now in edit mode
//         const addFormTitle = document.querySelector(".addpostform .form-title");

//         // Switch to the edit form
//         pages.forEach((page) => page.classList.remove("active"));
//         addFormDisplay.style.textContent = "none";
//         addFormTitle.style.display = "none";

//         editFormDisplay.style.display = "block";
//         document.getElementById("add-content").classList.add("active");
//       }

//       const articleId = e.target.dataset.id;
//       // Populate the form with post data
//       fetchEditData(articleId);
//     });
//   });
// };

//===========dash table display in state

const displayData = (article) => {
  if (!Array.isArray(article)) {
    console.error("Invalid posts data");
    return;
  }
  const rows = article
    .map(
      ({ _id: articleId, title, article, articlePicture }) => `
        
            <tr>
             
              <td>${title}</td>
              <td>test</td>
              <td>test 2</td>
              <td>
                <div class="btn-dash-container">
                  <a class="btn edit-btn" data-id="${articleId}" href="#users/dah/account/edit/${articleId}">Edit</a>
                  <a class="btn delete-btn" data-id="${articleId}" href="#">Delete</a>
                </div>
              </td>
            </tr>`
    )
    .join("");

  tableBodyDOM.innerHTML = rows;

  addEditListeners();
};

export { displayData };

console.log("from table");
