let themeToggle = document.getElementById("theme-toggle");

let themeIcon = themeToggle.querySelector("i");


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    } else {

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

});
