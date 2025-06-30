document.addEventListener("DOMContentLoaded", function () {
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

      // Lógica para link ativo
      const navLink = document.querySelector(
        `.nav-link[href="${currentPage}"]`
      );
      if (navLink) {
        navLink.classList.add("active");
      }

      // ** LÓGICA PRINCIPAL: APLICA O ESTILO DA NAVBAR CONFORME A PÁGINA **
      if (currentPage === "index.html") {
        navElement.classList.add("navbar-dynamic");

        // Adiciona o listener de scroll APENAS na index
        window.addEventListener("scroll", function () {
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
