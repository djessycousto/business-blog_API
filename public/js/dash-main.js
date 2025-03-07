function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page");

  // console.log(pages, "from dash main");
  pages.forEach((page) => {
    // console.log(page, "pages to remove");
    page.classList.remove("active");
  });

  // Show the selected page
  const selectedPage = document.getElementById(pageId);
  // console.log(selectedPage, "page id");
  selectedPage.classList.add("active");
}

const btns = document.querySelectorAll(".dash-btn");

const arrbtns = Array.from(btns);
// console.log(arrbtns);

arrbtns.map((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.target.dataset.id, "id");
    const pageId = e.target.dataset.id; //page 1
    showPage(pageId);
  });
});

// chart

const ctx = document.getElementById("myChart");

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Chart.canvas.parentNode.style.height = "128px";
// Chart.canvas.parentNode.style.width = "128px";

// nav\

const menu = document.querySelector(".humb-menu");

// menu.addEventListener("click", function () {});

function dashMenuToggle() {
  document.addEventListener("click", (e) => {
    const el = e.target;
    // console.log(el); //ok

    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav");

    if (el.classList.contains("menu")) {
      const navContainerHeight = navContainer.getBoundingClientRect().height;

      const navLinksHeight = navLinks.getBoundingClientRect().height;

      if (navContainerHeight === 24) {
        navContainer.style.height = `${navLinksHeight}px`;
      } else {
        navContainer.style.height = 0;
      }
    }

    if (!el.classList.contains("menu")) {
      navContainer.style.height = 0;
    }
  });
}

dashMenuToggle();

// logout

function logoutV1() {
  const logoutBtn = document.querySelector(".logout");

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("logout cliked");
    const fetchlogout = async () => {
      const response = await fetch("/auth/logout");
      console.log(response);
      //   // check if sucess
      if (!response.ok) {
        console.log("there is an issue");
        console.error(response);
      }

      window.location.href = `/home`;
    };
    fetchlogout();
  });
}

logoutV1();
