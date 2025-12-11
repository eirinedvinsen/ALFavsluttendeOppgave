document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return; // siden har ingen logout-knapp
  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = !!currentUser;
  
    if (!isLoggedIn) {
      // Gjest: skjul knappen helt
      logoutBtn.style.display = "none";
      return;
    }
  
    // Innlogget: aktiver knappen
    logoutBtn.addEventListener("click", () => {
      // Fjern innlogget bruker
      localStorage.removeItem("currentUser");
  
      // (Valgfritt) behold brukerdata per bruker, så rating/kommentarer dukker opp neste gang de logger inn.
      // Hvis du ønsker å slette alt per bruker ved logout, kan du gjøre f.eks.:
      //
      // const storageKeyClimbed = `climbedRoutesFor${currentUser.username}`;
      // const storageKeyUserData = `routeDataFor${currentUser.username}`;
      // localStorage.removeItem(storageKeyClimbed);
      // localStorage.removeItem(storageKeyUserData);
  
      // Send til innloggingssiden
      window.location.href = "innlogging.html";
    });
  });