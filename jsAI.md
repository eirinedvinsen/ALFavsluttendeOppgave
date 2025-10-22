let climbedRoutes = JSON.parse(localStorage.getItem("climbedRoutes")) || [];

// --- 🧩 Funksjon for å vise rutene ---
function renderRoutes() {

  // 🟩 Denne linjen her definerer "container"
  const container = document.getElementById("climbingRoutes");

  container.innerHTML = ""; // tømmer innholdet i div-en

  // Nå kan vi trygt bruke container
  routes.forEach(route => {
    const isChecked = climbedRoutes.includes(route.id);

    const routeDiv = document.createElement("div");
    routeDiv.classList.add("route");

    routeDiv.innerHTML = `
      <label>
        <input type="checkbox" ${isChecked ? "checked" : ""} data-id="${route.id}">
        <strong>${route.name}</strong> – ${route.grade} (${route.location})
      </label>
    `;

    // Her bruker vi "container" som vi definerte over
    container.appendChild(routeDiv);
  });

  // --- Legg til event listeners på checkboxes ---
  document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener("change", e => {
      const id = parseInt(e.target.getAttribute("data-id"));

      if (e.target.checked) {
        climbedRoutes.push(id);
      } else {
        climbedRoutes = climbedRoutes.filter(routeId => routeId !== id);
      }

      localStorage.setItem("climbedRoutes", JSON.stringify(climbedRoutes));
    });
  });
}

// --- 🚀 Kjør funksjonen ---
renderRoutes();