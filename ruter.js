// --------- BRUKER / INNLOGGING ---------

// Finn innlogget bruker (hvis noen)
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const isLoggedIn = !!currentUser;

// Egen nøkkel i localStorage per bruker (uten underscore)
const storageKeyClimbed = isLoggedIn
  ? `climbedRoutesFor${currentUser.username}`
  : null;

const storageKeyUserData = isLoggedIn
  ? `routeDataFor${currentUser.username}`
  : null;

// Hvilke ruter denne brukeren har logget
let climbedRoutes = isLoggedIn
  ? JSON.parse(localStorage.getItem(storageKeyClimbed)) || []
  : [];

// Per-bruker data: rating + kommentarer
let userData = isLoggedIn
  ? JSON.parse(localStorage.getItem(storageKeyUserData)) || { ratings: {}, comments: {} }
  : { ratings: {}, comments: {} };

if (!userData.ratings) userData.ratings = {};
if (!userData.comments) userData.comments = {};

// Disse fylles med data fra ruter.json når loadRouteData() kjører
let routes = [];
let savedComments = [];

// Henter HTML-elementer vi skal bruke (SPA: listView vs detailView)
let listView = document.getElementById("listView");
let detailView = document.getElementById("detailView");
let climbingRoutesDiv = document.getElementById("climbingRoutes");

const routeName = document.getElementById("routeName");
const routeGrade = document.getElementById("routeGrade");
const routeInfo = document.getElementById("routeInfo");

const commentsInput = document.getElementById("comments");          // textarea
const ratingStars = document.getElementById("ratingStars");         // stjerner
const previousCommentsDiv = document.getElementById("previousComments"); // div for gamle kommentarer
const detailClimbedToggle = document.getElementById("detailClimbedToggle");
const saveCommentsBtn = document.getElementById("saveCommentsBtn");

const backBtn = document.getElementById("backBtn");

let currentRoute = null;

console.log("Init elements:", {
  listView,
  detailView,
  climbingRoutesDiv,
  routeName,
  routeGrade,
  routeInfo,
  commentsInput,
  ratingStars,
  previousCommentsDiv,
  backBtn,
  detailClimbedToggle,
  saveCommentsBtn
});

// --------- HENTE DATA FRA ruter.json ---------

async function loadRouteData() {
  console.log("Laster ruter.json ...");

  try {
    const response = await fetch("ruter.json");

    if (!response.ok) {
      throw new Error("HTTP-feil: " + response.status);
    }

    const data = await response.json();

    // Legger data inn i variablene våre
    routes = data.routes || [];
    savedComments = data.savedComments || [];

    console.log("Data lastet:", {
      antallRuter: routes.length,
      antallKommentarer: savedComments.length
    });
  } catch (error) {
    console.error("Feil ved lasting av ruter.json:", error);
  }
}

// --------- HJELPEFUNKSJONER (LAGRING / UI) ---------

function saveUserData() {
  if (!isLoggedIn || !storageKeyUserData) return;
  localStorage.setItem(storageKeyUserData, JSON.stringify(userData));
}

// Oppdater stjerne-UI basert på rating for gitt rute
function updateRatingStarsUI(routeId) {
  if (!ratingStars) return;
  const stars = Array.from(ratingStars.querySelectorAll("span"));
  const currentRating = isLoggedIn ? userData.ratings[routeId] || 0 : 0;

  stars.forEach(star => {
    const val = parseInt(star.dataset.value, 10);
    star.classList.toggle("active", val <= currentRating);
  });
}

// Tegn kommentarer for en bestemt rute (fra ruter.json + brukerens egne)
function renderCommentsForRoute(routeId) {
  if (!previousCommentsDiv) return;

  const routeComments = savedComments.filter(c => c.id === routeId);
  const userComments = userData.comments[routeId] || [];

  previousCommentsDiv.innerHTML = "";

  if (routeComments.length === 0 && userComments.length === 0) {
    previousCommentsDiv.textContent = "Ingen kommentarer enda.";
    return;
  }

  // Kommentarer fra ruter.json
  routeComments.forEach(commentObj => {
    const commentEl = document.createElement("div");
    commentEl.classList.add("previousComment");
    const ratingText = commentObj.rating ? ` (${commentObj.rating})` : "";
    commentEl.textContent = `${commentObj.user}${ratingText}: ${commentObj.comment}`;
    previousCommentsDiv.appendChild(commentEl);
  });

  // Brukerens egne kommentarer fra localStorage
  userComments.forEach(commentObj => {
    const commentEl = document.createElement("div");
    commentEl.classList.add("previousComment");
    const ratingText = commentObj.rating ? ` (${commentObj.rating})` : "";
    const userLabel = currentUser ? currentUser.username : "Du";
    commentEl.textContent = `${userLabel}${ratingText}: ${commentObj.text}`;
    previousCommentsDiv.appendChild(commentEl);
  });
}

// Lager en pen tekst ut av info-objektet i ruter.json
function getRouteInfoText(route) {
  if (!route.info) {
    return "Ingen ruteinfo tilgjengelig.";
  }

  const height = route.info.height;
  const anchorBolts = route.info.anchorBolts;
  const protectionBolts = route.info.protectionBolts;

  // Quickdraws = antall bolter du klipper (protectionBolts)
  return `Høyde: ${height} m, toppfeste: ${anchorBolts} bolter, quickdraws: ${protectionBolts}`;
}

// --------- LISTEVISNING ---------

// Tegner liste-oversikt, basert på routes fra ruter.json
function renderList(filteredRoutes = routes) {
  console.log("Render list, antall ruter:", filteredRoutes.length);

  if (!climbingRoutesDiv) {
    console.error("Finner ikke #climbingRoutes i HTML-en");
    return;
  }

  // Tømmer lista før vi tegner på nytt
  climbingRoutesDiv.innerHTML = "";

  // Hvis ingen ruter (f.eks. feil i lasting), vis en enkel tekst
  if (!filteredRoutes || filteredRoutes.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.textContent = "Ingen ruter å vise.";
    climbingRoutesDiv.appendChild(emptyDiv);

    if (listView && detailView) {
      listView.style.display = "block";
      detailView.style.display = "none";
    }
    return;
  }

  filteredRoutes.forEach(route => {
    const isChecked = climbedRoutes.includes(route.id);

    const routeDiv = document.createElement("div");
    routeDiv.classList.add("route");
    routeDiv.dataset.id = route.id;

    if (isChecked) {
      routeDiv.classList.add("routeClimbed");
    }

    const label = document.createElement("div");
    label.classList.add("routeLabel");

    // status-ikon til venstre
    const statusSpan = document.createElement("span");
    statusSpan.classList.add("routeStatus");
    statusSpan.textContent = isChecked ? "✅" : "⬜";

    const gradeText = route.grade ? route.grade : "ukjent grad";
    const textSpan = document.createElement("span");
    textSpan.textContent = `${route.name} (${gradeText})`;

    label.appendChild(statusSpan);
    label.appendChild(textSpan);

    routeDiv.appendChild(label);

    // Klikk på hele ruta => åpne detaljvisning
    routeDiv.addEventListener("click", () => {
      showDetail(route.id);
    });

    climbingRoutesDiv.appendChild(routeDiv);
  });

  if (listView && detailView) {
    listView.style.display = "block";
    detailView.style.display = "none";
  } else {
    console.warn("listView eller detailView finnes ikke i HTML.");
  }
}

// --------- FILTER / SØK ---------

// Filterer på navn, grad, lengde og quickdraws
function applyFilters() {
  const searchInputElement = document.getElementById("search");
  const query = searchInputElement ? searchInputElement.value.toLowerCase() : "";

  // Grad fra/til
  const gradeFilterFromElement = document.getElementById("gradeFilter");
  const gradeFilterToElement = document.getElementById("gradeFilterTwo");
  const selectedGradeFrom = gradeFilterFromElement ? gradeFilterFromElement.value : "";
  const selectedGradeTo = gradeFilterToElement ? gradeFilterToElement.value : "";
  const gradeFrom = selectedGradeFrom ? parseInt(selectedGradeFrom) : null;
  const gradeTo = selectedGradeTo ? parseInt(selectedGradeTo) : null;

  // Lengde (meter) fra/til
  const lengthFromValue = document.getElementById("lengthFilterFrom")?.value;
  const lengthToValue = document.getElementById("lengthFilterTo")?.value;
  const lengthFrom = lengthFromValue ? parseInt(lengthFromValue) : null;
  const lengthTo = lengthToValue ? parseInt(lengthToValue) : null;

  // Quickdraws (protectionBolts) fra/til
  const quickdrawFromValue = document.getElementById("quickdrawFilterFrom")?.value;
  const quickdrawToValue = document.getElementById("quickdrawFilterTo")?.value;
  const quickdrawFrom = quickdrawFromValue ? parseInt(quickdrawFromValue) : null;
  const quickdrawTo = quickdrawToValue ? parseInt(quickdrawToValue) : null;

  const filtered = routes.filter(route => {
    // 1) Søk på navn
    const matchesSearch =
      !query || route.name.toLowerCase().includes(query);

    // 2) Filtrere på grad (bruker bare tallet i starten, f.eks. "7+/8-" → 7)
    let matchesGrade = true;
    if (gradeFrom !== null || gradeTo !== null) {
      const gradeNumber = parseInt(route.grade); // kan bli NaN
      if (isNaN(gradeNumber)) {
        matchesGrade = false;
      } else {
        if (gradeFrom !== null && gradeNumber < gradeFrom) matchesGrade = false;
        if (gradeTo !== null && gradeNumber > gradeTo) matchesGrade = false;
      }
    }

    // 3) Filtrere på lengde (height i info)
    let matchesLength = true;
    if (lengthFrom !== null || lengthTo !== null) {
      const height = route.info?.height;
      if (typeof height !== "number") {
        matchesLength = false;
      } else {
        if (lengthFrom !== null && height < lengthFrom) matchesLength = false;
        if (lengthTo !== null && height > lengthTo) matchesLength = false;
      }
    }

    // 4) Filtrere på quickdraws (protectionBolts i info)
    let matchesQuickdraws = true;
    if (quickdrawFrom !== null || quickdrawTo !== null) {
      const quickdraws = route.info?.protectionBolts;
      if (typeof quickdraws !== "number") {
        matchesQuickdraws = false;
      } else {
        if (quickdrawFrom !== null && quickdraws < quickdrawFrom) matchesQuickdraws = false;
        if (quickdrawTo !== null && quickdraws > quickdrawTo) matchesQuickdraws = false;
      }
    }

    return (
      matchesSearch &&
      matchesGrade &&
      matchesLength &&
      matchesQuickdraws
    );
  });

  console.log("Filter resultat, antall ruter:", filtered.length);
  renderList(filtered);
}

// Alle filter-felter bruker samme filter-funksjon
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

const gradeFilterFrom = document.getElementById("gradeFilter");
if (gradeFilterFrom) {
  gradeFilterFrom.addEventListener("change", applyFilters);
}

const gradeFilterTo = document.getElementById("gradeFilterTwo");
if (gradeFilterTo) {
  gradeFilterTo.addEventListener("change", applyFilters);
}

// Lytte på lengde-filter
const lengthFromInput = document.getElementById("lengthFilterFrom");
if (lengthFromInput) {
  lengthFromInput.addEventListener("input", applyFilters);
}
const lengthToInput = document.getElementById("lengthFilterTo");
if (lengthToInput) {
  lengthToInput.addEventListener("input", applyFilters);
}

// Lytte på quickdraw-filter
const quickdrawFromInput = document.getElementById("quickdrawFilterFrom");
if (quickdrawFromInput) {
  quickdrawFromInput.addEventListener("input", applyFilters);
}
const quickdrawToInput = document.getElementById("quickdrawFilterTo");
if (quickdrawToInput) {
  quickdrawToInput.addEventListener("input", applyFilters);
}

// --------- DETALJVISNING ---------

function showDetail(routeId) {
  console.log("Vis detaljer for id:", routeId);

  // Finn ruten med riktig id
  currentRoute = routes.find(r => r.id === routeId);
  if (!currentRoute) {
    console.warn("Fant ikke rute med id:", routeId);
    return;
  }

  // Sjekk at det faktisk fant HTML-elementene
  if (!routeName || !routeGrade || !routeInfo || !commentsInput || !previousCommentsDiv) {
    console.error("DetailView-elementer mangler i HTML (routeName/routeGrade/routeInfo/comments/previousComments).");
    return;
  }

  // Sync "logget rute"-toggle basert på climbedRoutes (kun for innlogget bruker)
  if (detailClimbedToggle) {
    detailClimbedToggle.checked = isLoggedIn && climbedRoutes.includes(routeId);
  }

  // Sett inn navn, grad og info
  routeName.textContent = currentRoute.name || "Ukjent navn";

  routeGrade.textContent = currentRoute.grade
    ? `Grad: ${currentRoute.grade}`
    : "Grad: ukjent";

  // Bruker info-objektet fra ruter.json
  routeInfo.textContent = getRouteInfoText(currentRoute);

  // Kommentarfelt: kun redigerbart for innlogget bruker
  if (commentsInput) {
    if (isLoggedIn) {
      commentsInput.removeAttribute("readonly");
      commentsInput.placeholder = "Skriv en kommentar...";
    } else {
      commentsInput.setAttribute("readonly", "readonly");
      commentsInput.placeholder = "Logg inn for å skrive kommentar";
    }
    commentsInput.value = "";
  }

  // Rating-stjerner for denne ruta
  updateRatingStarsUI(routeId);

  // Vis kommentarer for denne ruten
  renderCommentsForRoute(routeId);

  if (listView && detailView) {
    listView.style.display = "none";
    detailView.style.display = "block";
  } else {
    console.warn("listView eller detailView finnes ikke i HTML.");
  }
}

// --------- KNAPPER / TOGGLE / RATING / KOMMENTAR ---------

// Tilbake-knapp: gå tilbake til listevisning
if (backBtn) {
  backBtn.addEventListener("click", () => {
    console.log("Klikket på tilbake-knapp");
    renderList();
  });
} else {
  console.warn("Finner ikke backBtn i HTML.");
}

// "Logget rute" toggle i detailView
if (detailClimbedToggle) {
  if (!isLoggedIn) {
    // Gjestevisning – kan ikke logge ruter
    detailClimbedToggle.disabled = true;
    detailClimbedToggle.title = "Logg inn for å logge ruter";
  } else {
    detailClimbedToggle.disabled = false;
    detailClimbedToggle.title = "";

    detailClimbedToggle.addEventListener("change", (e) => {
      if (!currentRoute) return;
      const id = currentRoute.id;

      if (e.target.checked) {
        if (!climbedRoutes.includes(id)) {
          climbedRoutes.push(id);
        }
      } else {
        climbedRoutes = climbedRoutes.filter(routeId => routeId !== id);
      }

      if (storageKeyClimbed) {
        localStorage.setItem(storageKeyClimbed, JSON.stringify(climbedRoutes));
      }

      progressCounter();

      // Speil endringen i listView
      const routeDiv = climbingRoutesDiv?.querySelector(`.route[data-id="${id}"]`);
      if (!routeDiv) return;

      const statusSpan = routeDiv.querySelector(".routeStatus");
      if (statusSpan) {
        statusSpan.textContent = e.target.checked ? "✅" : "⬜";
      }

      routeDiv.classList.toggle("routeClimbed", e.target.checked);
    });
  }
}

// RATING-STJERNER
if (ratingStars) {
  const stars = Array.from(ratingStars.querySelectorAll("span"));

  if (!isLoggedIn) {
    ratingStars.classList.add("rating-disabled");
    ratingStars.title = "Logg inn for å gi rating";
  } else {
    ratingStars.classList.remove("rating-disabled");
    ratingStars.title = "";

    stars.forEach(star => {
      star.addEventListener("click", () => {
        if (!currentRoute) return;
        const value = parseInt(star.dataset.value, 10);
        if (isNaN(value)) return;

        const routeId = currentRoute.id;
        userData.ratings[routeId] = value;
        saveUserData();
        updateRatingStarsUI(routeId);
      });
    });
  }
}

// KOMMENTAR-KNAPP
if (saveCommentsBtn) {
  if (!isLoggedIn) {
    saveCommentsBtn.disabled = true;
    saveCommentsBtn.title = "Logg inn for å lagre kommentarer";
  } else {
    saveCommentsBtn.disabled = false;
    saveCommentsBtn.title = "";

    saveCommentsBtn.addEventListener("click", () => {
      if (!currentRoute || !commentsInput) return;
      const text = commentsInput.value.trim();
      if (!text) return;

      const routeId = currentRoute.id;
      if (!userData.comments[routeId]) {
        userData.comments[routeId] = [];
      }

      const ratingForRoute = userData.ratings[routeId] || null;

      userData.comments[routeId].push({
        text,
        date: new Date().toISOString(),
        rating: ratingForRoute,
      });

      saveUserData();
      commentsInput.value = "";
      renderCommentsForRoute(routeId);
    });
  }
}

// --------- PROGRESJONSTELLER ---------

function progressCounter() {
  const progressText = document.getElementById("progressText");
  if (!progressText) {
    console.warn("Finner ikke #progressText i HTML.");
    return;
  }

  if (!isLoggedIn) {
    progressText.textContent = "Logg inn for å lagre hvilke ruter du har klatret.";
    return;
  }

  progressText.textContent = `${climbedRoutes.length} av ${routes.length} ruter logget.`;
}

// --------- START APPEN ---------

// Starter med å hente data fra ruter.json
async function init() {
  // 1. Last data fra ruter.json
  await loadRouteData();

  // 2. Tegn lista basert på de ruter som kom inn
  renderList();

  // 3. Oppdater progresjonsteksten
  progressCounter();
}

document.addEventListener("DOMContentLoaded", init);


//bestemme range, (slider?)
//to nedtrekksmenyer til og fra ( godt sted å starte)
//endre rekkefølgen fra hvor i feltet til gradstørrelse
//design tilslutt 


