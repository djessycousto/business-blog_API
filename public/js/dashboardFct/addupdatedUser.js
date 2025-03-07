document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const btn = document.getElementById("registerBtn");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("userName");
    const email = document.getElementById("userEmail");
    const password = document.getElementById("userPassword");
    const aboutTheUser = document.getElementById("aboutTheUser");
    console.log(aboutTheUser, aboutTheUser.value);
    const userImageInput = document.getElementById("userImage");
    const userImage = userImageInput.files[0];
    const messageDiv = document.querySelector(".message");

    const inputBorders = [name, email, password, aboutTheUser];

    // Validation
    if (!name.value || !email.value || !password.value || !aboutTheUser.value) {
      message(inputBorders, "error-message", "All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      message([email], "error-message", "Invalid email address");
      return;
    }

    if (password.value.length < 6) {
      message(
        [password],
        "error-message",
        "Password must be at least 6 characters"
      );
      return;
    }

    // Prepare FormData
    const postFormDetail = new FormData();
    postFormDetail.append("name", name.value.trim());
    postFormDetail.append("email", email.value.trim());
    postFormDetail.append("password", password.value.trim());
    postFormDetail.append("aboutTheUser", aboutTheUser.value.trim());

    try {
      const userDetailResponse = await fetch("/auth/signin", {
        method: "POST",
        body: postFormDetail,
      });

      // Handle non-OK response
      if (!userDetailResponse.ok) {
        const errorData = await userDetailResponse.json();
        throw new Error(errorData.error || "Failed to register user");
      }

      const userDetail = await userDetailResponse.json();
      // console.log(userDetail, "user detail ", userDetail.aboutTheUser);
      form.reset();
      window.location.reload;

      const { userId } = userDetail.user;

      // Upload image
      if (userImage) {
        const imageFormDetail = new FormData();
        imageFormDetail.append("userImage", userImage);

        const imageResponse = await fetch(`/users/uploadUserPic/${userId}`, {
          method: "POST",
          body: imageFormDetail,
        });

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          throw new Error(errorData.error || "Failed to upload user image");
        }

        const imageData = await imageResponse.json();
        // console.log("Image uploaded:", imageData);
      }

      messageDiv.textContent = "User registration successful!";
      setTimeout(() => (messageDiv.textContent = ""), 5000);
      window.location.reload;
    } catch (error) {
      // Display error message to the user
      console.error("Error:", error.message);
      messageDiv.textContent = error || "An unexpected error occurred.";
      setTimeout(() => (messageDiv.textContent = ""), 5000);
      form.reset();
    }
  });
});

// Error message function
function message(inputBorders, addClass, msg) {
  const messageDiv = document.querySelector(".message");

  inputBorders.forEach((input) => {
    input.style.border = "1px solid red";
  });

  messageDiv.classList.add(addClass);
  messageDiv.textContent = msg;

  setTimeout(() => {
    inputBorders.forEach((input) => {
      input.style.border = "";
    });
    messageDiv.classList.remove(addClass);
    messageDiv.textContent = "";
  }, 5000);
}
