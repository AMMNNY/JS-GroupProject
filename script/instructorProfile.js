import { getActiveUser } from '../script/auth.js';
/* =========================================
   API
========================================= */

const API_URL = "http://localhost:3000";

const INSTRUCTORS_URL = `${API_URL}/instructors`;
const STUDENTS_URL = `${API_URL}/students`;
const COURSES_URL = `${API_URL}/courses`;


/* =========================================
   DATA
========================================= */

let instructor = null;

let instructorStudents = [];

let allCourses = [];


/* =========================================
   GET INSTRUCTOR ID FROM URL
========================================= */

const params =
    new URLSearchParams(window.location.search);

const instructorId =
    params.get("id") || getActiveUser()?.id;


/* =========================================
   ELEMENTS
========================================= */

const instructorImage =
    document.getElementById("instructorImage");

const imageFallback =
    document.getElementById("imageFallback");

const instructorName =
    document.getElementById("instructorName");

const instructorSpecialization =
    document.getElementById("instructorSpecialization");

const instructorEmail =
    document.getElementById("instructorEmail");

const instructorLocation =
    document.getElementById("instructorLocation");

const instructorStatus =
    document.getElementById("instructorStatus");


/* Statistics */

const totalStudents =
    document.getElementById("totalStudents");

const totalCourses =
    document.getElementById("totalCourses");

const experienceYears =
    document.getElementById("experienceYears");

const activeStudents =
    document.getElementById("activeStudents");


/* Overview */

const overviewName =
    document.getElementById("overviewName");

const overviewSpecialization =
    document.getElementById("overviewSpecialization");

const overviewEmail =
    document.getElementById("overviewEmail");

const overviewPhone =
    document.getElementById("overviewPhone");

const overviewLocation =
    document.getElementById("overviewLocation");

const overviewExperience =
    document.getElementById("overviewExperience");


/* Students */

const studentsTableBody =
    document.getElementById("studentsTableBody");

const noStudents =
    document.getElementById("noStudents");

const studentSearch =
    document.getElementById("studentSearch");


/* Courses */

const coursesGrid =
    document.getElementById("coursesGrid");


/* About */

const instructorBio =
    document.getElementById("instructorBio");


/* Modal */

const editModal =
    document.getElementById("editModal");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const editInstructorForm =
    document.getElementById("editInstructorForm");


/* Form Inputs */

const editName =
    document.getElementById("editName");

const editEmail =
    document.getElementById("editEmail");

const editPhone =
    document.getElementById("editPhone");

const editSpecialization =
    document.getElementById("editSpecialization");

const editExperience =
    document.getElementById("editExperience");

const editLocation =
    document.getElementById("editLocation");

const editImage =
    document.getElementById("editImage");

const editStatus =
    document.getElementById("editStatus");

const editBio =
    document.getElementById("editBio");


/* =========================================
   LOAD PROFILE
========================================= */

async function loadInstructorProfile() {

    try {

        if (!instructorId) {

            throw new Error(
                "Instructor ID is missing from URL"
            );

        }


        /* Fetch instructor */

        const instructorResponse =
            await fetch(
                `${INSTRUCTORS_URL}/${instructorId}`
            );


        if (!instructorResponse.ok) {

            throw new Error(
                "Instructor not found"
            );

        }


        instructor =
            await instructorResponse.json();


        // Support both name and fullName
        instructor.name =
            instructor.name ||
            instructor.fullName ||
            "No Name";


        /* Fetch students */

        const studentsResponse =
            await fetch(STUDENTS_URL);


        if (!studentsResponse.ok) {

            throw new Error(
                "Could not load students"
            );

        }


        const students =
            await studentsResponse.json();


        instructorStudents =
            students.filter((student) => {

                return (
                    student.instructorId ===
                    instructor.id
                );

            });


        /* Fetch courses */

        const coursesResponse =
            await fetch(COURSES_URL);


        if (!coursesResponse.ok) {

            throw new Error(
                "Could not load courses"
            );

        }


        allCourses =
            await coursesResponse.json();


        /* Display Data */

        displayInstructor();

        displayStatistics();

        displayStudents(
            instructorStudents
        );

        displayCourses();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/* =========================================
   GET INITIALS
========================================= */

function getInitials(name) {

    if (!name) {
        return "--";
    }


    const words =
        name
            .trim()
            .split(" ")
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();

}


/* =========================================
   DISPLAY IMAGE
========================================= */

function displayInstructorImage() {

    const initials =
        getInitials(instructor.name);


    imageFallback.textContent =
        initials;


    if (!instructor.image) {

        instructorImage.style.display =
            "none";

        imageFallback.style.display =
            "flex";

        return;

    }


    instructorImage.onload = function () {

        instructorImage.style.display =
            "block";

        imageFallback.style.display =
            "none";

    };


    instructorImage.onerror = function () {

        instructorImage.style.display =
            "none";

        imageFallback.style.display =
            "flex";

    };


    instructorImage.src =
        instructor.image;

}


/* =========================================
   DISPLAY INSTRUCTOR
========================================= */

function displayInstructor() {

    instructorName.textContent =
        instructor.name || "No Name";


    instructorSpecialization.textContent =
        instructor.specialization ||
        "No specialization";


    instructorEmail.textContent =
        instructor.email ||
        "No email";


    instructorLocation.textContent =
        instructor.location ||
        "No location";


    instructorStatus.textContent =
        instructor.status ||
        "Active";


    if (
        instructor.status
            ?.toLowerCase() ===
        "inactive"
    ) {

        instructorStatus.classList.add(
            "inactive"
        );

    }
    else {

        instructorStatus.classList.remove(
            "inactive"
        );

    }


    /* Overview */

    overviewName.textContent =
        instructor.name || "--";


    overviewSpecialization.textContent =
        instructor.specialization || "--";


    overviewEmail.textContent =
        instructor.email || "--";


    overviewPhone.textContent =
        instructor.phone || "--";


    overviewLocation.textContent =
        instructor.location || "--";


    overviewExperience.textContent =
        `${Number(instructor.experience) || 0} Years`;


    /* About */

    instructorBio.textContent =
        instructor.bio ||
        "No biography available.";


    displayInstructorImage();

}


/* =========================================
   GET INSTRUCTOR COURSES
========================================= */

function getInstructorCourses() {

    return allCourses.filter((course) => {

        return (
            course.instructor ===
            instructor.id
        );

    });

}


/* =========================================
   STATISTICS
========================================= */

function displayStatistics() {

    const active =
        instructorStudents.filter(
            (student) => {

                return (
                    student.status
                        ?.toLowerCase() ===
                    "active"
                );

            }
        );


    totalStudents.textContent =
        instructorStudents.length;


    activeStudents.textContent =
        active.length;


    /* Courses belonging to instructor */

    const instructorCourses =
        getInstructorCourses();


    totalCourses.textContent =
        instructorCourses.length;


    experienceYears.textContent =
        Number(instructor.experience) || 0;

}


/* =========================================
   CALCULATE STUDENT GRADE
========================================= */

function calculateStudentGrade(student) {

    const assignment =
        Number(
            student.grades?.assignments
        ) || 0;


    const quiz =
        Number(
            student.grades?.quizzes
        ) || 0;


    const exam =
        Number(
            student.grades?.exam
        ) || 0;


    const overall =
        assignment * 0.30 +
        quiz * 0.20 +
        exam * 0.50;


    return Math.round(overall);

}


/* =========================================
   DISPLAY STUDENTS
========================================= */

function displayStudents(students) {

    studentsTableBody.innerHTML = "";


    if (students.length === 0) {

        noStudents.style.display =
            "block";

        return;

    }


    noStudents.style.display =
        "none";


    students.forEach((student) => {

        const row =
            document.createElement("tr");


        const initials =
            getInitials(student.name);


        const grade =
            calculateStudentGrade(student);


        const status =
            student.status || "Active";


        const statusClass =
            status.toLowerCase() ===
            "inactive"
                ? "inactive"
                : "";


        row.innerHTML = `

            <td>

                <div class="student-cell">

                    <div class="student-avatar">
                        ${initials}
                    </div>

                    <div>

                        <div class="student-name">
                            ${student.name || "--"}
                        </div>

                        <div class="student-id">
                            ${student.studentId || "--"}
                        </div>

                    </div>

                </div>

            </td>


            <td>
                ${student.studentId || "--"}
            </td>


            <td>
                ${student.course || "--"}
            </td>


            <td>
                ${Number(student.attendance) || 0}%
            </td>


            <td>
                ${grade}%
            </td>


            <td>

                <span
                    class="table-status ${statusClass}"
                >
                    ${status}
                </span>

            </td>


            <td>

                <button
                    class="view-profile-btn"
                    type="button"
                    title="View Student Profile"
                    data-id="${student.id}"
                >

                    <i
                        class="fa-solid fa-arrow-right"
                    ></i>

                </button>

            </td>

        `;


        studentsTableBody.appendChild(
            row
        );

    });


    addStudentProfileEvents();

}


/* =========================================
   STUDENT PROFILE BUTTONS
========================================= */

function addStudentProfileEvents() {

    const buttons =
        document.querySelectorAll(
            ".view-profile-btn"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function () {

                const studentId =
                    this.dataset.id;


                window.location.href =
                    `StudentProfile.html?id=${studentId}`;

            }
        );

    });

}


/* =========================================
   SEARCH STUDENTS
========================================= */

studentSearch.addEventListener(
    "input",
    function () {

        const searchValue =
            this.value
                .trim()
                .toLowerCase();


        const filteredStudents =
            instructorStudents.filter(
                (student) => {

                    return (

                        student.name
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        student.studentId
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        student.course
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                    );

                }
            );


        displayStudents(
            filteredStudents
        );

    }
);


/* =========================================
   DISPLAY COURSES
========================================= */

function displayCourses() {

    coursesGrid.innerHTML = "";


    // Get only courses assigned
    // to the current instructor
    const instructorCourses =
        getInstructorCourses();


    if (instructorCourses.length === 0) {

        coursesGrid.innerHTML = `

            <div class="empty-state"
                 style="display:block;">

                <i class="fa-solid fa-book"></i>

                <h3>No courses found</h3>

                <p>
                    No courses are currently assigned
                    to this instructor.
                </p>

            </div>

        `;

        return;

    }


    instructorCourses.forEach(
        (course) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "course-card";


            card.innerHTML = `

                <div class="course-icon">

                    <i
                        class="fa-solid fa-code"
                    ></i>

                </div>


                <h3>
                    ${course.name || "Untitled Course"}
                </h3>


                <p>
                    ${
                        course.description ||
                        "Course taught by this instructor."
                    }
                </p>

            `;


            coursesGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================
   TABS
========================================= */

const tabs =
    document.querySelectorAll(".tab");


const tabContents =
    document.querySelectorAll(
        ".tab-content"
    );


tabs.forEach((tab) => {

    tab.addEventListener(
        "click",
        function () {

            const targetTab =
                this.dataset.tab;


            tabs.forEach((item) => {

                item.classList.remove(
                    "active"
                );

            });


            tabContents.forEach(
                (content) => {

                    content.classList.remove(
                        "active"
                    );

                }
            );


            this.classList.add(
                "active"
            );


            document
                .getElementById(targetTab)
                .classList.add(
                    "active"
                );

        }
    );

});



/* =========================================
   BACK BUTTON
========================================= */

document
    .getElementById("backBtn")
    .addEventListener(
        "click",
        function () {

            window.history.back();

        }
    );


/* =========================================
   START
========================================= */

loadInstructorProfile();