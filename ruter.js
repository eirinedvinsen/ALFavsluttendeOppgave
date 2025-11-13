// dette er flyttet til script, frem til filen blir for stor, hva er for stort, nobody knows
const routes = [
    {
        id: 1,
        name: "Sanne løgner",
        location: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        type: "sport",
        info: "Toppfeste: 2 limbolter, Antall bolter: 3 bolter, høyde: 10m",
        status: "not climbed",
        rating: null
    },
    {
        id: 2,
        name: "Geocache",
        location: "Helleneset klatrefelt, Bergen",
        grade: "7",
        type: "sport",
        info: "Toppfest: 2 ringer/limbolter, Antall bolter: 4 bolter, høyde: 12m",
        status: "not climbed",
        rating: null
    },
    {
        id: 3,
        name: "Åpent prosjekt",
        status: "unavailable",
    },
    {
        id: 4,
        name: "Babewatch",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "8/8+",
        type: "sport",
        info: "Toppfeste: 2 ringer/limbolter, Antall bolter: 4 bolter, høyde: 15m",
        status: "not climbed",
        rating: null
    },
    {
        id: 5,
        name: "Babywatch",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "8-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 6,
        name: "En famlende finger",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7+/8-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 7,
        name: "Evangelisk aksjon",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 8,
        name: "Faustino",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 9,
        name: "Tjuvstart",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "8-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 10,
        name: "Solodiederet",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "6+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 11,
        name: "Nødskrik",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "5-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 12,
        name: "á la Buoux",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 13,
        name: "Patricks favoritt",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 14,
        name: "På skråplanet igjen",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 15,
        name: "Fortidens helter",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 16,
        name: "Straffen for luksus",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 17,
        name: "Rock versus opera",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 18,
        name: "Glemte minner",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 19,
        name: "Test-lab.",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "6+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 20,
        name: "á la carte",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "6",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 21,
        name: "Billy the kid",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "6-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 22,
        name: "S-risset",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "4+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 23,
        name: "Tannlegeskrekk",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "5+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 24,
        name: "Leppa",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 25,
        name: "Krysset",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "5+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 26,
        name: "Bånnaren",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "5+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 27,
        name: "Chun",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "4-",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 28,
        name: "Navigator",
        locaction: "Helleneset klatrefelt, Bergen",
        grade: "3+",
        type: "sport",
        status: "not climbed",
        rating: null
    }
];

let savedComments = [
    {
        id: 1,
        name: "Sanne løgner",
        location: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        user: "Name Name",
        status: "climbed",
        comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, impedit?" ,
        rating: "3 of 5"
    },
    {
        id: 2,
        name: "Geocache",
        location: "Helleneset klatrefelt, Bergen",
        grade: "7",
        user: "Name Name",
        status: "climbed",
        comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, impedit?" ,
        rating: "4 of 5"
    },    
    {
        id: 4,
        name: "Babewatch",
        location: "Helleneset klatrefelt, Bergen",
        grade: "8/8+",
        user: "Name Name",
        status: "climbed",
        comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, impedit?" ,
        rating: "2 of 5"
    }, 

];
//console.log(routes.length);

let climbedRoutes = JSON.parse(localStorage.getItem("climbedRoutes")) || [];

let listView = document.getElementById("listView");
let detailView = document.getElementById("detailView");
let climbingRoutesDiv = document.getElementById("climbingRoutes");

const routeName = document.getElementById("routeName");
const routeGrade = document.getElementById("routeGrade");
const routeInfo = document.getElementById("routeInfo");
const commentsDiv = document.getElementById("comments");
const rating = document.getElementById("rating");
const backBtn = document.getElementById("backBtn");

let currentRoute = null;

function renderList(filteredRoutes = routes){
    climbingRoutesDiv.innerHTML ="";

    filteredRoutes.forEach(route => {
        const isChecked = climbedRoutes.includes(route.id);
        const routeDiv = document.createElement("div");
        routeDiv.classList.add("route");

        const label = document.createElement("label");
        label.textContent = `${route.name} (${route.grade || "ukjent grad"})`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.id = route.id;
        checkbox.checked = isChecked;

        label.prepend(checkbox);
        routeDiv.appendChild(label);

        checkbox.addEventListener("click", e => {
            e.stopPropagation();

            const id= parseInt(e.target.dataset.id);
            if (e.target.checked){
                if(!climbedRoutes.includes(id)) climbedRoutes.push(id);
            } else {
                climbedRoutes = climbedRoutes.filter(rid => rid !== id);
            }
            localStorage.setItem("climbedRoutes", JSON.stringify(climbedRoutes));

            progressCounter();
        });

        routeDiv.addEventListener("click", ()=> showDetail(route.id));
        climbingRoutesDiv.appendChild(routeDiv);
    });
    listView.style.display = "block";
    detailView.style.display = "none";
};

document.getElementById("search").addEventListener("input", (e)=> {
    const query = e.target.value.toLowerCase();
    const filtered = routes.filter(r => r.name.toLowerCase().includes(query));
    renderList(filtered);
});

function applyFilters(){
    //en start på filtrering, neste er å kunne velge flere ruter for filtrering, f.eks 3-5
    const query = document.getElementById("search").value.toLowerCase();
    const selectedGradeFrom = document.getElementById("gradeFilter").value;
    const selectedGradeTo = document.getElementById("gradeFilterTwo").value;
    const gradeFrom = selectedGradeFrom ? parseInt(selectedGradeFrom) : null;
    const gradeTo = selectedGradeTo ? parseInt(selectedGradeTo) : null; 

    let filtered = routes;

    if(query){
        filtered = filtered.filter(r=> r.name.toLowerCase().includes(query));
    }
    
    if(gradeFrom !== null || gradeTo !== null){
        filtered = filtered.filter(r => {
            const g = parseInt(r.grade);
            if(isNaN(g)) return false;
            if(gradeFrom!== null && g < gradeFrom)return false;
            if (gradeTo !== null && g > gradeTo) return false;

            return true;
        })
    }

    renderList(filtered);
}

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("gradeFilter").addEventListener("change", applyFilters);
document.getElementById("gradeFilterTwo").addEventListener("change", applyFilters)

function showDetail(routeId){
    //console.log("Viser detaljer for rute med id:", routeId);
    currentRoute = routes.find(r => r.id === routeId);
    const saved = savedComments.find(c => c.id === routeId);

    routeName.textContent = currentRoute.name;
    routeGrade.textContent=`Grad: ${currentRoute.grade}`;
    routeInfo.textContent = currentRoute.info || "Ingen ruteinfo tilgjengelig";

    if (saved){
        commentsDiv.textContent = `Kommentar fra ${saved.user}: "${saved.comment}"`;
        rating.value = `Rating: ${saved.rating}`;
    } else {
        commentsDiv.textContent = "Ingen kommentarer enda.";
        rating.value = "";
    }
    listView.style.display = "none";
    detailView.style.display= "block";
};

backBtn.addEventListener("click", () => {
   // console.log ("Back to list");
    renderList();
});

function progressCounter(){
    const progressText = document.getElementById("progressText");
    progressText.textContent = `${climbedRoutes.length} av ${routes.length} ruter logget.`;
}


renderList();
progressCounter();

//bestemme range, (slider?)
//to nedtrekksmenyer til og fra ( godt sted å starte)
//endre rekkefølgen fra hvor i feltet til gradstørrelse
//design tilslutt 


