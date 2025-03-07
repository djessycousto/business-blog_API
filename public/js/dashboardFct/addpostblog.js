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

    const title = document.getElementById("addTitle").value;
    const article = document.getElementById("addPost").value;
    const categories = document.getElementById("addCategory").value;
    const tags = document.getElementById("tags").value;
    const subTitle = document.getElementById("subTitle").value;
    const postPictureInput = document.getElementById("addPostPicture");

    // reset the post id
    let articlePicture = postPictureInput.files[0];

    if (!title || !article || !categories || !tags) {
      console.log("all field must be fill");
    }
    // if (!title) {
    //   console.log("please field must be fill");
    // }
    // if (!article) {
    //   console.log("all field must be fill");
    // }
    // if (!categories) {
    //   console.log("all field must be fill");
    // }

    // if (!tags) {
    //   console.log("all field must be fill");
    // }
    // form data

    // if (postPicture == null) {
    // remain data

    const updateDataPost = new FormData();
    updateDataPost.append("title", title);
    updateDataPost.append("article", article);
    updateDataPost.append("categories", categories);
    updateDataPost.append("suTitle", subTitle);
    updateDataPost.append("tags", tags);
    // updateDataPost.append("postPicture", addpostData.postPicture.path);

    for (const entry of updateDataPost.entries()) {
      console.log(entry); //okay
      // }

      // addPostRes = await fetch("http://localhost:8080/api-blog/v1/article", {
      //   method: "POST",
      //   body: updateDataPost,
      // });

      // if (!addPostRes.ok) {
      //   return console.log(
      //     "error in the post js dash-blog data js",
      //     addPostRes
      //   );
      // }

      // addPost = await addPostRes.json();

      // console.log(addPost, "all datasaved");

      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 200);
      // } else {
      //   const updateData = new FormData();
      //   updateData.append("postPicture", postPicture);

      // Append values to FormData

      // // test entries
      // for (const entry of updateData.entries()) {
      //   console.log(entry); //okay
      // }

      // const addPostResponse = await fetch("/posts/uploadPostPic", {
      //   method: "POST",
      //   body: updateData,
      // });

      // if (!addPostResponse.ok) {
      //   return console.log("error in the post js dash-blog js");
      // }

      // const addpostData = await addPostResponse.json();
      // window.location.reload();

      // // console.log(addpostData, "image saved");

      // remain data

      // const updateDataPost = new FormData();
      // updateDataPost.append("title", title);
      // updateDataPost.append("post", post);
      // updateDataPost.append("category", category);
      // updateDataPost.append("postPicture", addpostData.postPicture.path);

      // addPostRes = await fetch("/posts", {
      //   method: "POST",
      //   body: updateDataPost,
      // });

      // if (!addPostRes.ok) {
      //   return console.log("error in the post js dash-blog data js");
      // }

      // addPost = await addPostRes.json();
      // window.location.reload();
      // // console.log(addPost);

      // setTimeout(() => {
      //   window.location.reload();
      // }, 200);
    }
  }); //dom
});
