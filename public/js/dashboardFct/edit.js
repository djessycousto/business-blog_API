// ////////////////////// Fetch all blog posts
// const fetchData = async (forUser = false) => {
//     try {
//       const endpoint = forUser ? "/posts/user" : "/posts";
//       const response = await fetch(endpoint);
//       const data = await response.json();

//       if (!data.posts) {
//         console.error("Invalid posts data:", data);
//         return [];
//       }

//       const posts = await Promise.all(
//         data.posts.map(async (post) => {
//           const userResponse = await fetch(`/users/${post.user}`);
//           const userData = await userResponse.json();

//           return { ...post, user: userData };
//         })
//       );
//       return posts;
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       return [];
//     }
//   };

//////////////////////  End Fetch all blog posts

// ======= display table position

/* 
Using the add article for edit as well

*/

// Add event listeners for edit buttons
// Fetch and populate edit form data
const fetchEditData = async (articleId) => {
  try {
    const response = await fetch(`/api-blog/v1/article/${articleId}`);
    const data = await response.json();
    const { article } = data;

    // const { article } = await response.json();

    //==================populate Element============================
    const form = document.getElementById("editForm");
    const title = (document.getElementById("edit-title").value = article.title);
    const blog = (document.getElementById("edit-article").value =
      article.article);
    // // const author = document.getElementById("author").value = article.author;
    const categories = (document.getElementById("edit-categories").value =
      article.categories);
    const tags = (document.getElementById("edit-tags").value = article.tags);
    const subTitle = (document.getElementById("edit-subTitle").value =
      article.subTitle);
    const postPictureInput = document.getElementById("edit-articlePicture");
    //   article.postPicture);
    const id = (document.getElementById("articleId").value = article._id);

    const editImageNameDisplay = document.getElementById(
      "edit-imageNameDisplay"
    );

    const currentImage = (document.getElementById("currentPostPicture").value =
      article.articlePicture);
    // Display current image name on load
    if (currentImage) {
      const imageName = currentImage.split("/").pop();
      // Extracts filename from URL
      editImageNameDisplay.textContent = `Current Image: ${imageName}`;
    }

    // Update name display if a new file is uploaded
    postPictureInput.addEventListener("change", (e) => {
      const newFile = e.target.files[0];
      if (newFile) {
        editImageNameDisplay.textContent = `New Image: ${newFile.name}`;
      }
    });

    // Set the hidden input with the current image path
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
};

// Handle the form submission
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const editForm = document.querySelector("#editForm");
  const articleId = document.getElementById("articleId").value;
  console.log(articleId, "articleId"); // done

  const postPictureInput = document.getElementById("edit-articlePicture");
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
  console.log(newPostPicture);
  if (newPostPicture) {
    // Handle new image upload
    const imageFormData = new FormData();
    imageFormData.append("articlePicture", newPostPicture);

    try {
      const imageResponse = await fetch(`/api-blog/v1/article/picture`, {
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
    console.log(updateData.postPicture);

    // window.location.reload();
  }

  // Send update request
  try {
    const response = await fetch(`/api-blog/v1/article/${articleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      console.log("Post updated successfully");
      console.log(response.statusText);

      //   window.location.reload(); // Optionally refresh the page
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

export { fetchEditData };

console.log("from edit");
