window.addEventListener("DOMContentLoaded", () => {});

// async function userEmailVerification() {
//   // get url
//   const params = new URLSearchParams(window.location.search);
//   const token = params.get("token");
//   const email = params.get("email");

//   // fetch
//   if (!token && !email) {
//     console.log("no tokken, no email");
//     return;
//   }
//   const response = await fetch("/auth/verify-email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ token, email }),
//   });

//   if (!response.ok) {
//     console.log("something went wrong ");
//   }
//   const message = document.querySelector(".message");
//   const data = await response.json();
//   console.log(data);
//   message.textContent = data;
// }

// userEmailVerification();

console.log("hello");

const origin = "http://localhost:8080/api-blog/v1";

async function userEmailVerification() {
  console.log("Script loaded, starting verification...");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

  console.log("Extracted token:", token);
  console.log("Extracted email:", email);

  if (!token || !email) {
    console.log("No token or email found in URL");
    return;
  }

  try {
    console.log(`Sending request to ${origin}/auth/verify-email...`);

    const response = await fetch(`${origin}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, email }), // object okay
    });

    const data = await response.json();
    console.log("Response received:", data);

    const message = document.querySelector(".message");
    message.textContent = data.msg || "Verification complete!";
  } catch (error) {
    console.error("Error in fetch:", error);
  }
}

// Call function when page loads
userEmailVerification();
