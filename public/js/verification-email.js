const baseURL =
  window.location.hostname === "localhost"
    ? `${window.location.origin}/api-blog/v1`
    : window.location.origin;

window.addEventListener("DOMContentLoaded", () => {});

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

async function resetPassword() {
  console.log("test");
}

// call resetPassword
resetPassword();

// Call function when page loads
userEmailVerification();
