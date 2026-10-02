let editForm = document.getElementById("editStudentForm");

let studentName = document.getElementById("studentName");
let course = document.getElementById("course");
let attendance = document.getElementById("attendance");

let gradeAssignments = document.getElementById("gradeAssignments");
let gradeQuizzes = document.getElementById("gradeQuizzes");
let gradeExam = document.getElementById("gradeExam");

let studentFeedback = document.getElementById("studentFeedback");
let studentStatus = document.getElementById("studentStatus");

let currentId = "S004";


fetch(`http://localhost:3000/students/${currentId}`)
    .then(response => response.json())
    .then(student => {

        studentName.value = student.name;
        course.value = student.course;
        attendance.value = student.attendance;

        gradeAssignments.value = student.grades.assignments;
        gradeQuizzes.value = student.grades.quizzes;
        gradeExam.value = student.grades.exam;

        studentFeedback.value = student.feedback;
        studentStatus.value = student.status;

    });


editForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let updatedStudent = {

        name: studentName.value,

        course: course.value,

        attendance: attendance.value,

        grades: {
            assignments: gradeAssignments.value,
            quizzes: gradeQuizzes.value,
            exam: gradeExam.value
        },

        feedback: studentFeedback.value,

        status: studentStatus.value
    };


    fetch(`http://localhost:3000/students/${currentId}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedStudent)

    })
        .then(response => response.json())
        .then(data => {

            console.log("Student updated:", data);

        });

});