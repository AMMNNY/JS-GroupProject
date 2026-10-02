import { getActiveUser } from '../script/auth.js';

let addStudentButton = document.getElementById('add-student');

let addStudentModal = document.getElementById('addStudentModal');

let closeAddModal = document.getElementById('closeAddModal');

let cancelAdd = document.getElementById('cancelAdd');

let addStudentForm = document.getElementById('addStudentForm');

let studentId = document.getElementById('studentId');

let studentName = document.getElementById('studentName');

let studentCourse = document.getElementById('studentCourse');

let studentFeedback = document.getElementById('studentFeedback');

let studentActivation = document.getElementById('studentActivation');

let currentInstructor = getActiveUser();

addStudentButton.addEventListener("click", function () {

    addStudentModal.classList.add("active");

});


// Open Modal

addStudentButton.addEventListener("click", function () {

    addStudentModal.classList.add("active");

});


// Close Modal

closeAddModal.addEventListener("click", function () {

    addStudentModal.classList.remove("active");

});


// Cancel

cancelAdd.addEventListener("click", function () {

    addStudentModal.classList.remove("active");

});


// Add Student

addStudentForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    let addStudent = {

        instructorId: currentInstructor.id,

        studentId: studentId.value,

        name: studentName.value,

        course: studentCourse.value,

        attendance: null,

        grades: {
            assignments: null,
            quizzes: null,
            exam: null
        },

        feedback: studentFeedback.value || null,

        status: studentActivation.value
    };

    await addNewStudent(addStudent);

});


async function addNewStudent(student) {

    let response = await fetch("http://localhost:3000/students", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    });

    let data = await response.json();

    console.log("Student added:", data);

    addStudentModal.classList.remove("active");

    addStudentForm.reset();

    window.location.reload();

}