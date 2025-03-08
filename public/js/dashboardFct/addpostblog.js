///############## ADD post  ########################
const baseURL =
  window.location.hostname === "localhost"
    ? `${window.location.origin}/api-blog/v1`
    : window.location.origin;

const addPostBtn = document.getElementById("addForm");

document.addEventListener("DOMContentLoaded", () => {
  addPostBtn.addEventListener("submit", async (e) => {
    // prevent default
    e.preventDefault();

    const form = document.getElementById("addForm");
    const title = document.getElementById("title").value;
    const article = document.getElementById("article").value;
    const categories = document.getElementById("categories").value;
    const tags = document.getElementById("tags").value;
    const subTitle = document.getElementById("subTitle").value;

    const postPictureInput = document.getElementById("articlePicture");
    console.log(postPictureInput.files[0]);

    // reset the post id
    // let articlePicture = postPictureInput.files[0];

    if (!title || !article || !categories || !tags) {
      showMessage(".message-error", "All fields must be filled");
      return;
    }
    if (!title) {
      showMessage(".message-error", "Title field must be filled");
      return;
    }
    if (!article) {
      showMessage(".message-error", "Tell us about your article");
      return;
    }
    if (!categories) {
      showMessage(".message-error", "Chose one category");
      return;
    }

    if (!tags) {
      showMessage(".message-error", "Chose one tag");
      return;
    }

    //

    const postData = {
      title,
      article,
      categories,
      subTitle,
      tags,
    };

    // upload Image

    // Upload image if provided
    if (postPictureInput.files[0]) {
      const uploadedImageUrl = await uploadImage(postPictureInput);
      if (!uploadedImageUrl) return; // Stop if image upload fails
      postData.articlePicture = uploadedImageUrl;
      console.log("Uploaded Image URL:", uploadedImageUrl);
    } else {
      console.log("No image file provided.");
    }

    // Send data via fetch
    addPostRes = await fetch("/api-blog/v1/article", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // For URLSearchParams
      body: JSON.stringify(postData),
    });

    // Check the response status
    if (!addPostRes.ok) {
      console.log(
        "Error: Request failed",
        addPostRes.status,
        addPostRes.statusText
      );
      const errorData = await addPostRes.json(); // Try to read the error response from the server
      showMessage(".message-error", errorData.message);
      // console.log("Error details:", errorData);
      return;
    }

    addPost = await addPostRes.json();
    showMessage(".message-success", addPost.message);
    //

    // Optionally, reload page after saving
    setTimeout(() => {
      window.location.reload();
      form.reset();
    }, 6000);
  }); // submit event listener
}); // DOMContentLoaded event listener

// image function

async function uploadImage(postPictureInput) {
  const pictureData = new FormData();
  pictureData.append("articlePicture", postPictureInput.files[0]);

  try {
    const pictureRes = await fetch("/api-blog/v1/article/picture", {
      method: "POST",
      body: pictureData,
    });

    const pictureResult = await pictureRes.json();
    if (pictureRes.ok) {
      return pictureResult.url; // Return the Cloudinary URL
    } else {
      console.error("Image upload failed:", pictureResult.message);
      showMessage(".message-error", "Image upload failed");
      return null;
    }
  } catch (error) {
    console.error("Image upload error:", error);
    showMessage(".message-error", "Image upload error");
    return null;
  }
}

// animation and show message

function showMessage(errorClass, errorMsg) {
  const errorMessage = document.querySelector(errorClass);
  errorMessage.style.display = "block";
  errorMessage.textContent = errorMsg;

  setTimeout(() => {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }, 5000);
}
