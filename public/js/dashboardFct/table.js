import { fetchEditData } from "./edit.js";
import { fetchAllArticle } from "../fetch.js";

let pages = Array.from(document.querySelectorAll(".page"));
const tableBodyDOM = document.querySelector(".tbody");

document.addEventListener("DOMContentLoaded", async () => {
  const article = await fetchAllArticle();
  displayData(article);
});

//===========dash state page table display

// Selecting the forms
const addFormDisplay = document.querySelector(".addpost-form");
const editFormDisplay = document.querySelector(".edit-form");

let isEditMode = false; // Tracks the mode
editFormDisplay.style.display = "none"; // Ensure edit form is hidden by default

// Add event listeners for edit buttons
const addEditListeners = () => {
  document.querySelectorAll(".edit-btn").forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default navigation behavior

      const articleId = e.target.dataset.id;

      if (articleId) {
        isEditMode = true;

        // Show the edit form, hide add form
        addFormDisplay.style.display = "none";
        editFormDisplay.style.display = "block";

        // Ensure the page is marked as active
        pages.forEach((page) => page.classList.remove("active"));
        document.getElementById("add-content").classList.add("active");

        // Fetch and populate the edit form data
        fetchEditData(articleId);
      }
    });
  });
  // addFormDisplay.style.display = "none";
};
console.log("else click ");

// Handle navigation back to Add Post mode
document.getElementById("addPostBtn").addEventListener("click", (e) => {
  e.preventDefault();

  // reset
});

//  reset pages
//
pages.forEach((page) => {
  document.addEventListener("click", (e) => {
    isEditMode = false;

    if (e.target.dataset.id === "add-content") {
      page.classList.remove("active");
      addFormDisplay.style.display = "block";
      editFormDisplay.style.display = "none";
      document.getElementById("add-content").classList.add("active");
      return;
    } else {
      return;
    }
  });
});

//===========dash table display in state
const displayData = (article) => {
  if (!Array.isArray(article)) {
    console.error("Invalid posts data");
    return;
  }

  const rows = article
    .map(
      ({ _id: articleId, title }) => `
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

// coneecting and update the page what left to do
