console.log('Hello!');

// legge til en lagreknapp, må ha user input som kommentar til hva de kan lagre. 
// legge til en toggle, dark/lightmode
// let climbedRoutes = JSON.parse(localStorage.getItem("climbedRoutes")) || [];
const routes = [
    {
        id: 1,
        name: "Sanne løgner",
        location: "Helleneset klatrefelt, Bergen",
        grade: "7+",
        type: "sport",
        status: "not climbed",
        rating: null
    },
    {
        id: 2,
        name: "Geocache",
        location: "Helleneset klatrefelt, Bergen",
        grade: "7",
        type: "sport",
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
]

let climbingRoutes = "";

for(let i=0; i < routes.length; i++){
    climbingRoutes += `<div class="table"> ${routes[i].name} </div>`;
};


// må repeteres, safer option example let minDiv = document.createElement('div');
// minDiv.classList.add("red");
// minDiv.setAttribute("id", "hallo");

document.getElementById("climbingRoutes").innerHTML = climbingRoutes;

function renderRoutes(){
    const container = document.getElementById("climbingRoutes");
    container.innerHTML = "";
    routes.forEach(route=>{
        const isChecked = climbingRoutes.includes(route.id);
        const routeDiv = document.createElement("div");
        routeDiv.classList.add("route");
        routeDiv.innerHTML = `<label> <input type="checkbox" ${isChecked ? "checked" : ""} data-id="${route.id}">
        <strong>${route.name}</strong> - ${route.grade} (${route.location}) <label>Kommentar: <input type="text" class="commentBox"></label><br><label>Rating <input type="number" min="1" max="5" class="ratingBox"></label>`;
        container.appendChild(routeDiv);
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(box=>{
        box.addEventListener("change", e => {
            const id = parseInt(e.target.getAttribute("data-id"));
            
            if(e.target.checked){
                climbedRoutes.push(id);
            } else{
                climbedRoutes = climbedRoutes.filter(routeID => routeId !== id);
            }
            localStorage.setItem("climbedRoutes", JSON.stringify(climbedRoutes));
        });
    });

    // document.querySelectorAll('.commentBox').forEach(input => {
    //     input.addEventListener("input", e => {
    //         const id = parseInt(e.target.getAttribute("data-id"));
    //         let route = climbedRoutes.find(r => r.id === id);
    //         if(!route){
    //             route = {id: id};
    //             climbedRoutes.push(route);
    //         }
    //         route.comment = e.target.value;
    //         saveData();
    //     });
    // });

    // document.querySelectorAll('.ratingBox').forEach(input => {
    //     input.addEventListener("input", e => {
    //         const id = parseInt(e.target.getAttribute("data-id"));
    //         let route = climbedRoutes.find(r => r.id === id);
    //         if(!route){
    //             route = {id: id};
    //             climbedRoutes.push(route);
    //         }
    //         route.rating = parseInt(e.target.value);
    //         saveData();
    //     });
    // });
    // function saveData(){
    //     localStorage.setItem("climbedRoutes", JSON.stringify(climbedRoutes));
    // }
};

renderRoutes();