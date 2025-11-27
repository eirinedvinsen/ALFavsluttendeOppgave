// Henter tidligere lagrede ruter fra localStorage (eller tom liste hvis ingenting lagret)
let climbedRoutes = JSON.parse(localStorage.getItem("climbedRoutes")) || [];

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
    backBtn
});

// --------- HENTE DATA FRA ruter.json ---------

function loadRouteData() {
    console.log("Laster ruter.json ...");
    fetch("ruter.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP-feil: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Legger data inn i variablene våre
            routes = data.routes || [];
            savedComments = data.savedComments || [];

            console.log("Data lastet:", {
                antallRuter: routes.length,
                antallKommentarer: savedComments.length
            });

            // Når data er klare, tegner vi liste og oppdaterer progresjon
            renderList();
            progressCounter();
        })
        .catch(error => {
            console.error("Klarte ikke laste ruter.json:", error);
        });
}

// --------- HJELPEFUNKSJON: INFO-TEKST ---------

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

        const label = document.createElement("label");

        const gradeText = route.grade ? route.grade : "ukjent grad";
        label.textContent = `${route.name} (${gradeText})`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.id = route.id;
        checkbox.checked = isChecked;

        // Checkbox før teksten
        label.prepend(checkbox);
        routeDiv.appendChild(label);

        // Klikk på boksen = oppdatere lagrede klatreruter
        checkbox.addEventListener("click", e => {
            // VIKTIG: vi stopper ikke bobling her
            const id = parseInt(e.target.dataset.id);
            console.log("Klikket på checkbox for rute id:", id);

            if (e.target.checked) {
                if (!climbedRoutes.includes(id)) climbedRoutes.push(id);
            } else {
                climbedRoutes = climbedRoutes.filter(rid => rid !== id);
            }
            localStorage.setItem("climbedRoutes", JSON.stringify(climbedRoutes));

            progressCounter();
        });

        // Klikk på selve rute-diven = åpne detaljvisning
        routeDiv.addEventListener("click", (e) => {
            // Hvis det faktiske klikket traff en <input> (checkbox) → gjør ingenting
            if (e.target.tagName.toLowerCase() === "input") {
                console.log("Klikk på checkbox, åpner IKKE detaljvisning");
                return;
            }
        
            console.log("Klikket på rute-div (ikke checkbox), id:", route.id, "target:", e.target.tagName);
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

    // Sjekk at vi faktisk fant HTML-elementene
    if (!routeName || !routeGrade || !routeInfo || !commentsInput || !previousCommentsDiv) {
        console.error("DetailView-elementer mangler i HTML (routeName/routeGrade/routeInfo/comments/previousComments).");
        return;
    }

    // Sett inn navn, grad og info
    routeName.textContent = currentRoute.name || "Ukjent navn";

    routeGrade.textContent = currentRoute.grade
        ? `Grad: ${currentRoute.grade}`
        : "Grad: ukjent";

    // Bruker info-objektet fra ruter.json
    routeInfo.textContent = getRouteInfoText(currentRoute);

    // Tøm textarea hver gang vi åpner detaljvisning
    commentsInput.value = "";

    // Vis tidligere kommentarer for denne ruten (fra savedComments i ruter.json)
    const routeComments = savedComments.filter(c => c.id === routeId);

    previousCommentsDiv.innerHTML = ""; // tømmer gammel visning

    if (routeComments.length === 0) {
        previousCommentsDiv.textContent = "Ingen kommentarer enda.";
    } else {
        routeComments.forEach(commentObj => {
            const commentEl = document.createElement("div");
            commentEl.classList.add("previous-comment");
            commentEl.textContent = `${commentObj.user} (${commentObj.rating}): ${commentObj.comment}`;
            previousCommentsDiv.appendChild(commentEl);
        });
    }

    // (valgfritt) resette stjerner visuelt her senere

    if (listView && detailView) {
        listView.style.display = "none";
        detailView.style.display = "block";
    } else {
        console.warn("listView eller detailView finnes ikke i HTML.");
    }
}

// Tilbake-knapp: gå tilbake til listevisning
if (backBtn) {
    backBtn.addEventListener("click", () => {
        console.log("Klikket på tilbake-knapp");
        renderList();
    });
} else {
    console.warn("Finner ikke backBtn i HTML.");
}

// --------- PROGRESJONSTELLER ---------

function progressCounter() {
    const progressText = document.getElementById("progressText");
    if (!progressText) {
        console.warn("Finner ikke #progressText i HTML.");
        return;
    }

    progressText.textContent = `${climbedRoutes.length} av ${routes.length} ruter logget.`;
}

// --------- START APPEN ---------

// Starter med å hente data fra ruter.json
loadRouteData();


//bestemme range, (slider?)
//to nedtrekksmenyer til og fra ( godt sted å starte)
//endre rekkefølgen fra hvor i feltet til gradstørrelse
//design tilslutt 


