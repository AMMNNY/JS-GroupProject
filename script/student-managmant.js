let addBtn = document.getElementById('add-new-student');
let studentId = document.getElementById('studentId');
let studentName = document.getElementById('studentName');
let studentCourse = document.getElementById('studentCourse');
let studentFeedback = document.getElementById('studentFeedback');
let studentActivation = document.getElementById('studentActivation');

// Add new Student

addBtn.addEventListener("click", async function (e) {

    e.preventDefault();

    let addStudent = {
        instructorId: "I001",

        // Student ID entered by the instructor
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

}