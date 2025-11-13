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
document.getElementById("gradeFilterTwo").addEventListener("change", applyFilters);

//saving this in case I want to use it