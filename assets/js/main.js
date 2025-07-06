document.addEventListener("DOMContentLoaded", () => {
  // Carrega o Footer
  fetch("templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // Carrega a Navbar e aplica o estilo correto
  fetch("templates/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const navElement = document.querySelector("#navbar-placeholder nav");
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

      const navLink = document.querySelector(
        `.nav-link[href="${currentPage}"]`
      );
      if (navLink) {
        navLink.classList.add("active");
      }

      if (currentPage === "index.html") {
        navElement.classList.add("navbar-dynamic");

        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            navElement.classList.add("scrolled");
          } else {
            navElement.classList.remove("scrolled");
          }
        });
      } else {
        navElement.classList.add("navbar-solid");
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar a navbar:", error);
    });
});
