function subscribe() {
  const newsletterForm = document.getElementById("news-letter");
  const newsletterClientEmail = document.getElementById("newsLetter-email");
  const newsletterBtn = document.getElementById("newsLetter-send-btn");

  //

  newsletterBtn.addEventListener("click", async () => {
    // check email
    if (!newsletterClientEmail.value) {
      message([email], "error-message", "The email field is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterClientEmail.value)) {
      message([email], "error-message", "invalid email required");
      return;
    }

    const newsLetterFormData = new FormData();
    newsLetterFormData.append("email", newsletterClientEmail);

    // fetch

    const newsletterResponse = await fetch("/posts/newsletter-subscription", {
      methode: "post",
      body: newsLetterFormData,
    });

    if (!newsletterResponse.ok) {
      console.log("error when saving newsletter");
      return message(
        [email],
        "error-message",
        "internal server issue please try later"
      );
    }

    const newsletterData = await newsletterResponse.json();

    console.log(newsletterData);
  }); // end click
}

function message(input, Addclass, msg) {
  const messageDiv = document.querySelector(".message");

  input.style.border = "1px solid red";

  messageDiv.classList.add(Addclass);
  messageDiv.textContent = msg;

  setTimeout(() => {
    inputBorders.forEach((input) => {
      input.style.border = "";
    });

    messageDiv.classList.remove(Addclass);
    messageDiv.textContent = "";
  }, 5000);
}
