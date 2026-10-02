let editModal = document.getElementById("editStudentModal");

let editForm = document.getElementById("editStudentForm");

let closeEditModal = document.getElementById("closeEditModal");

let cancelEdit = document.getElementById("cancelEdit");

let editStudentName = document.getElementById("editStudentName");

let editCourse = document.getElementById("editCourse");

let editAttendance = document.getElementById("editAttendance");

let editAssignments = document.getElementById("editAssignments");

let editQuizzes = document.getElementById("editQuizzes");

let editExam = document.getElementById("editExam");

let editFeedback = document.getElementById("editFeedback");

let editStatus = document.getElementById("editStatus");


let currentStudentId = null;


// Open Edit Modal

document.addEventListener("click", async function (e) {

    let editButton = e.target.closest(".edit-btn");

    if (!editButton) {
        return;
    }

    currentStudentId = editButton.dataset.id;

    let response = await fetch(
        `http://localhost:3000/students/${currentStudentId}`
    );

    let student = await response.json();


    editStudentName.value = student.name;

    editCourse.value = student.course;

    editAttendance.value = student.attendance ?? "";

    editAssignments.value = student.grades.assignments ?? "";

    editQuizzes.value = student.grades.quizzes ?? "";

    editExam.value = student.grades.exam ?? "";

    editFeedback.value = student.feedback ?? "";

    editStatus.value = student.status;


    editModal.classList.add("active");

});


// Close

closeEditModal.addEventListener("click", function () {

    editModal.classList.remove("active");

});


// Cancel

cancelEdit.addEventListener("click", function () {

    editModal.classList.remove("active");

});


// Save Changes

editForm.addEventListener("submit", async function (e) {

    e.preventDefault();


    let updatedStudent = {

        name: editStudentName.value,

        course: editCourse.value,

        attendance: editAttendance.value === ""
            ? null
            : Number(editAttendance.value),

        grades: {

            assignments: editAssignments.value === ""
                ? null
                : Number(editAssignments.value),

            quizzes: editQuizzes.value === ""
                ? null
                : Number(editQuizzes.value),

            exam: editExam.value === ""
                ? null
                : Number(editExam.value)

        },

        feedback: editFeedback.value || null,

        status: editStatus.value

    };


    let response = await fetch(
        `http://localhost:3000/students/${currentStudentId}`,
        {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedStudent)

        }
    );


    let data = await response.json();

    console.log("Student updated:", data);


    editModal.classList.remove("active");

    window.location.reload();

});