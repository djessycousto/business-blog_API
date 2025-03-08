function login() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const btn = document.getElementById("loginBtn");

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("clicked");

      // front end validation
      // console.log(userName);
      const email = document.getElementById("userEmail").value;
      console.log(userEmail);
      const password = document.getElementById("userPassword").value;
      //   const messageDiv = form.querySelector(".message");

      try {
        let formData = {
          email,
          // subject: subject.value,
          password,
        };
        // console.log(formData);

        // aftre login i can dynamicaly add nav
        try {
          const response = await axios.post(
            "http://localhost:8080/api-blog/v1/auth/login",
            formData
          );
          const { name, role, userId } = response.data.user;
          //   window.location.href = `/home`; // Redirect to home page on success
          alert("`login success`");

          // You can also handle additional logic here if needed
        } catch (error) {
          console.error("Error:", error);
          // Show a more detailed error message
          //   if (Error.response) {
          //     // If the error is from the server, display the server's error message
          //     // messageDiv.textContent = Error.response.data.msg || "Login failed";
          //     console.log("error");
          //   } else {
          //     // If it's a network error or no response from the server
          //     messageDiv.textContent = "Login failed. Please try again.";
          //   }
        }
        // Do something with the data, e.g., update UI or redirect
        // console.log("Received data:", { email, password });// only for test

        // if (!response.ok) {
        // }
      } catch (error) {
        console.error("Error:", error);
        // messageDiv.textContent = error;
      }
    });
  });
}

login();

console.log("hello ");
