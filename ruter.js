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

console.log(routes.length);

let climbedRoutes = JSON.parse(localStorage.getItem("climbedRoutes")) || [];

let listView = document.getElementById("listView");
let detailView = document.getElementById("detailView");
let climbingRoutesDiv = document.getElementById("climbedRoutes");

const routeName = document.getElementById("routeName");
const routeGrade = document.getElementById("routeGrade");
const routeInfo = document.getElementById("routeInfo");
const comments = document.getElementById("comments");
const rating = document.getElementById("rating");
const backBtn = document.getElementById("backBtn");

let currentRoute = null;

function renderList(){
    console.log("Tegner ut rutene");
    climbingRoutesDiv.innerHTML = "";

    routes.forEach(route =>{
        console.log("legger til rute:" , route.name, route.grade);
        const routeDiv = document.createElement("div");
        routeDiv.classList.add("route");
        routeDiv.textContent = `${route.name} (${route.grade})`;
        routeDiv.addEventListener("click", () => showDetail(route.id));
        climbingRoutesDiv.appendChild(routeDiv);
        console.log("Ruter lag til i DOM", routeDiv.textContent);
    });
    
    listView.style.display = "block";
    detailView.style.display = "none";
};

function showDetail(routeId){
    currentRoute = routes.find(r => r.id === routeId);
    const savedData = climbedRoutes.find(r => r.id === routeID) || {};

    routeName.textContent = currentRoute.name;
    routeGrade.textContent = `Grad: ${currentRoute.grade}`;
    routeInfo.textContent= `Ruteinfo: ${currentRoute.info}`;
}
