// =========================
// ELEMENTS
// =========================

const navLinks = document.getElementById("navLinks");
const mobileMenu = document.getElementById("mobileMenu");
const heroPrimaryBtn = document.getElementById("heroPrimaryBtn");

const currentUser = sessionStorage.getItem("eduTrackActiveUser");


// =========================
// NAVBAR LINKS
// =========================

if (!currentUser) {

    // Not logged in
    navLinks.innerHTML = `
        <a href="#about">About Oxford</a>
        <a href="#features">Features</a>
        <a href="pages/login.html" class="nav-login">Log In</a>
    `;

} else {

    // Logged in
    navLinks.innerHTML = `
        <a href="#about">About Oxford</a>
        <a href="pages/index.html">Dashboard</a>
        <a href="pages/InstructorProfile.html">Profile</a>
        <a href="#" id="signOutBtn">Sign Out</a>
    `;

    heroPrimaryBtn.firstChild.textContent = "Go to Dashboard ";
    heroPrimaryBtn.setAttribute("href", "pages/index.html");

    document.getElementById("signOutBtn").addEventListener("click", function (event) {
        event.preventDefault();
        sessionStorage.removeItem("eduTrackActiveUser");
        window.location.reload();
    });
}


// =========================
// MOBILE MENU
// =========================

function setMenuIcon(isOpen) {
    const icon = mobileMenu.querySelector("i");
    icon.classList.toggle("fa-xmark", isOpen);
    icon.classList.toggle("fa-bars", !isOpen);
}

mobileMenu.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");
    setMenuIcon(isOpen);
});

// Close the menu when a link is clicked
navLinks.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
        navLinks.classList.remove("active");
        setMenuIcon(false);
    }
});