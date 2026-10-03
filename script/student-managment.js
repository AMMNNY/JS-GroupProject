import { getActiveUser } from '../script/auth.js';

let archiveHandler = null;

export function initStudents() {

    let currentInstructor = getActiveUser();
    let studentsList = document.getElementById('students-list');
    let searchInput = document.getElementById('student-search');
    let students = [];


    async function getStudents() {

        let response = await fetch(
            `http://localhost:3000/students?instructorId=${currentInstructor.id}`
        );

        let allStudents = await response.json();

        students = allStudents.filter(function (student) {
            return student.deleted !== true;
        });

        displayStudents(students);
    }


    getStudents();


    if (archiveHandler) {
        document.removeEventListener("studentArchived", archiveHandler);
    }

    archiveHandler = function () {
        getStudents();
    };

    document.addEventListener("studentArchived", archiveHandler);


    function displayStudents(list) {

        studentsList.innerHTML = "";

        if (list.length === 0) {

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

                    <button type="button" class="empty-add-btn" id="empty-add-btn">
                        <i class="fa-solid fa-plus"></i>
                        Add Student
                    </button>

                </div>
            </td>
        </tr>
    `;

            document.getElementById("empty-add-btn").addEventListener("click", function () {
                document.getElementById("add-student").click();
            });

            return;
        }


        list.forEach(function (student) {

            let sum =
                (student.grades.assignments * 0.30) +
                (student.grades.quizzes * 0.20) +
                (student.grades.exam * 0.50);


            studentsList.innerHTML += `
                <tr>

                    <td>
                        <div class="student-info">
                            <a href="../pages/StudentProfile.html?id=${student.id}">
                                <span>${student.name}</span>
                            </a>
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

                        <button class="archive-btn" data-id="${student.id}">
                            <i class="fa-solid fa-box-archive"></i>
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

}