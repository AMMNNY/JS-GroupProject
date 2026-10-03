let themeToggle = document.getElementById("theme-toggle");

let themeIcon = themeToggle.querySelector("i");

themeToggle.setAttribute("aria-pressed", String(document.body.classList.contains("dark-mode")));

themeToggle.addEventListener("click", function () {

    let isDarkMode = document.body.classList.toggle("dark-mode");

    themeToggle.setAttribute("aria-pressed", String(isDarkMode));


    if (isDarkMode) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    } else {

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

});
