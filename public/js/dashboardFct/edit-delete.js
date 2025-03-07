//########### In the dashboard, this code are for table, edit and delete

let pages = Array.from(document.querySelectorAll(".page"));
const tableBodyDOM = document.querySelector(".tbody");

const addFormDisplay = document.querySelector(".addpost-form");
const editFormDisplay = document.querySelector(".editformpost");
let isEditMode = false;
// 1st
////////////////////// Fetch all blog posts
const fetchData = async (forUser = false) => {
  try {
    const endpoint = forUser ? "/posts/user" : "/posts";
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!data.posts) {
      console.error("Invalid posts data:", data);
      return [];
    }

    const posts = await Promise.all(
      data.posts.map(async (post) => {
        const userResponse = await fetch(`/users/${post.user}`);
        const userData = await userResponse.json();

        return { ...post, user: userData };
      })
    );
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

//////////////////////  End Fetch all blog posts

// Display posts in the table
const displayData = (posts) => {
  if (!Array.isArray(posts)) {
    console.error("Invalid posts data");
    return;
  }
  const rows = posts
    .map(
      ({ _id: postId, user, title, post: blog, likes, views, postPicture }) => `
      
          <tr>
            <td>${user?.user?.role || "N/A"}</td>
            <td>${title}</td>
            <td>${likes.length}</td>
            <td>${views.length}</td>
            <td>
              <div class="btn-dash-container">
                <a class="btn edit-btn" data-id="${postId}" href="#users/dah/account/edit/${postId}">Edit</a>
                <a class="btn delete-btn" data-id="${postId}" href="#">Delete</a>
              </div>
            </td>
          </tr>`
    )
    .join("");

  tableBodyDOM.innerHTML = rows;

  addEditListeners();
};

//////////////////////  End display

// Add event listeners for edit buttons
const addEditListeners = () => {
  document.querySelectorAll(".edit-btn").forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      // e.preventDefault();

      if (e.target.classList.contains("edit-btn")) {
        isEditMode = true; // We're now in edit mode
        const addFormTitle = document.querySelector(".addpostform .form-title");

        // Switch to the edit form
        pages.forEach((page) => page.classList.remove("active"));
        addFormDisplay.style.display = "none";
        addFormTitle.style.display = "none";

        editFormDisplay.style.display = "block";
        document.getElementById("add-content").classList.add("active");
      }

      const id = e.target.dataset.id;
      // Populate the form with post data
      fetchEditData(id);
    });
  });
};
// Add event listeners for edit buttons
// Fetch and populate edit form data
const fetchEditData = async (id) => {
  try {
    const response = await fetch(`/posts/${id}`);
    const { post } = await response.json();

    // Populate the form fields
    document.getElementById("editTitle").value = post.title;
    document.getElementById("editPost").value = post.post;
    document.getElementById("editCategory").value = post.category;
    document.getElementById("postId").value = post._id;
    document.getElementById("currentPostPicture").value = post.postPicture;

    // Set the hidden input with the current image path
    document.getElementById("currentPostPicture").value = post.postPicture;
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
};

// Handle the form submission
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const editForm = document.querySelector("#editForm");
  const postId = document.getElementById("postId").value;
  const postPictureInput = document.getElementById("editPostPicture");
  const currentPostPicture =
    document.getElementById("currentPostPicture").value;

  const formData = new FormData(editForm);
  const updateData = {};

  formData.forEach((value, key) => {
    if (!(value instanceof File)) {
      updateData[key] = value;
    }
  });

  // Handle new or existing image
  const newPostPicture = postPictureInput.files[0];
  if (newPostPicture) {
    // Handle new image upload
    const imageFormData = new FormData();
    imageFormData.append("postPicture", newPostPicture);

    try {
      const imageResponse = await fetch(`/posts/uploadPostPic/`, {
        method: "POST",
        body: imageFormData,
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        updateData.postPicture = imageData.postPicture.path; // Path from the server
      } else {
        console.error("Error uploading new image:", imageResponse.statusText);
      }
    } catch (error) {
      console.error("Error uploading new image:", error);
    }
  } else {
    // Use the existing image path
    updateData.postPicture = currentPostPicture;
    window.location.reload();
  }

  // Send update request
  try {
    const response = await fetch(`/posts/edit/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      console.log("Post updated successfully");
      window.location.reload(); // Optionally refresh the page
    } else {
      console.error(`Failed to update post: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
};
// Add single event listener for the submit button

const editPostForm = document.getElementById("editForm");

editPostForm.addEventListener("submit", handleFormSubmit);
//////////////================ Handle delete
const deletePost = async (postId) => {
  try {
    const response = await fetch(`/posts/${postId}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }

    console.log(`Post ${postId} deleted successfully`);
    start(); // Reload the data
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

// Add event listener for delete buttons
const addDeleteListeners = () => {
  tableBodyDOM.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const postId = e.target.dataset.id;
      deletePost(postId);
    }
  });
};

// Initialize the application
// const start = async () => {
//   const posts = await fetchData();
//   displayData(posts);
//   addDeleteListeners();
// };

document.addEventListener("DOMContentLoaded", async () => {
  const forUser = true; // Set this dynamically based on user selection or context
  const posts = await fetchData(forUser);
  displayData(posts);
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

// start();
