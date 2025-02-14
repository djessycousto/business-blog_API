const name = document.querySelector("#name");
const registrationBtn = document.querySelector("#submit");

const form = [...document.querySelector("form")];

registrationBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  //   const registrationBtn = document.querySelector("#submit");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const aboutTheUser = document.querySelector("#aboutTheUser");
  // checks
  //   console.log(username.value, email.value, password.value, aboutTheUser.value);

  if (
    !username.value ||
    !email.value ||
    !password.value ||
    !aboutTheUser.value
  ) {
    console.log(!username, !email, !password, !aboutTheUser);

    throw new Error("please fill the input");
  }

  // form data

  const registrationData = new FormData();
  registrationData.append("username", username.value.trim());
  registrationData.append("email", email.value.trim());
  registrationData.append("password", password.value.trim());
  registrationData.append("aboutTheUser", aboutTheUser.value.trim());

  //   loop throught
  for (const entry of registrationData.entries()) {
    console.log(entry, "entryies"); // okay
  }
  //   const formDataObject = Object.fromEntries(registrationData.entries());

  // Register user in my db
  try {
    const response = await fetch(
      "http://localhost:8080/api-blog/v1/auth/register",
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json", // ✅ Ensure JSON content type
        //   Accept: "application/json", // ✅ Helps with CORS sometimes
        // },
        // body: JSON.stringify(registrationData),
        body: registrationData,
      }
    );

    if (!response.ok) {
      console.log(response);

      throw new Error("something went wrong");
    }

    const addedResponse = await response.json();

    console.log(addedResponse);
  } catch (error) {
    console.log(error);
  }
});

// async function registerUser(data) {
//   const response = await fetch("/api-blog/v1/auth/register", {
//     method: "Post",
//     body: data,
//   });

//   if (!response.ok) {
//     throw new Error("something went wrong");
//   }

//   const addedResponse = await response.json();

//   console.log(addedResponse);
// }

// working======================
// const registrationBtn = document.querySelector("#submit");

// registrationBtn.addEventListener("click", async (e) => {
//   e.preventDefault();

//   const username = document.querySelector("#username").value;
//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;
//   const aboutTheUser = document.querySelector("#aboutTheUser").value;

//   if (!username || !email || !password || !aboutTheUser) {
//     console.log(
//       "Validation failed:",
//       !username,
//       !email,
//       !password,
//       !aboutTheUser
//     );
//     throw new Error("Please fill all input fields");
//   }

//   // ✅ Use a plain object instead of FormData
//   const registrationData = {
//     username,
//     email,
//     password,
//     aboutTheUser,
//   };

//   try {
//     const response = await fetch(
//       "http://localhost:8080/api-blog/v1/auth/register",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // ✅ Correct header for JSON
//           Accept: "application/json",
//         },
//         body: JSON.stringify(registrationData), // ✅ Convert object to JSON string
//       }
//     );

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       console.log("Server Error:", errorMessage);
//       throw new Error("Something went wrong");
//     }

//     const addedResponse = await response.json();
//     console.log("Success:", addedResponse);
//   } catch (error) {
//     console.log("Fetch error:", error.message);
//   }
// });
