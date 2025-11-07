const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("darkMode");
  icon.src = "crescent-moon-png-21.png";
} else {
  document.body.classList.remove("darkMode");
  icon.src = "sun.png";
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("darkMode");

  if (isDark) {
    icon.src = "crescent-moon-png-21.png";
    localStorage.setItem("theme", "dark");
  } else {
    icon.src = "sun.png";
    localStorage.setItem("theme", "light");
  }
});
