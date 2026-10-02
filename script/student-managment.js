import { getActiveUser } from '../script/auth.js';
let currentInstructor = getActiveUser();
let studentsList = document.getElementById('students-list');
let searchInput = document.getElementById('student-search');
let students = [];

async function getStudents() {

    let response = await fetch(
        `http://localhost:3000/students?instructorId=${currentInstructor.id}`
    );

    students = await response.json();
    displayStudents(students);
}
getStudents();
function displayStudents(students) {

    studentsList.innerHTML = "";

    if (students.length === 0) {

        studentsList.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">

                        <div class="empty-icon">
                            <i class="fa-solid fa-user-graduate"></i>
                        </div>

                        <h3>No students yet</h3>

                        <p>
                            You haven't added any students yet.
                            Start by adding your first student.
                        </p>

                        <a href="../pages/add-student.html" class="empty-add-btn">
                            <i class="fa-solid fa-plus"></i>
                            Add Student
                        </a>

                    </div>
                </td>
            </tr>
        `;

        return;
    }

    students.forEach(function (student) {

        let sum =
            (student.grades.assignments * 0.30) +
            (student.grades.quizzes * 0.20) +
            (student.grades.exam * 0.50);

        studentsList.innerHTML += `
            <tr>

                <td>
                    <div class="student-info">
                        <span>${student.name}</span>
                    </div>
                </td>

                <td>${student.course}</td>

                <td>
                    ${student.attendance ?? 0}%
                </td>

                <td>
                    <span class="grade">
                        ${sum.toFixed(0)}
                    </span>
                </td>

                <td>
                    <button class="edit-btn" data-id="${student.id}">
    <i class="fa-regular fa-pen-to-square"></i>
</button>

<button class="delete-btn" data-id="${student.id}">
    <i class="fa-regular fa-trash-can"></i>
</button>
                </td>

            </tr>
        `;
    });
}
searchInput.addEventListener("input", function () {
    let searchValue = searchInput.value.toLowerCase();

    let filteredStudents = students.filter(function (student) {
        return student.name.toLowerCase().includes(searchValue) ||
            (student.studentId &&
                student.studentId.toLowerCase().includes(searchValue));
    });

    displayStudents(filteredStudents);
});