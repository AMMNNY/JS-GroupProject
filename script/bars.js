
let students = [

    {
        id: "1001",
        name: "Ahmad",
        course: "JavaScript"
    },

    {
        id: "1002",
        name: "Sara",
        course: "HTML & CSS"
    }

];



let selectedStudentIndex = null;




const studentsTable =
    document.getElementById("studentsTable");


// Add Modal

const addModal =
    document.getElementById("addModal");

const openAddModal =
    document.getElementById("openAddModal");

const cancelAdd =
    document.getElementById("cancelAdd");

const addStudentForm =
    document.getElementById("addStudentForm");


// Edit Modal

const editModal =
    document.getElementById("editModal");

const cancelEdit =
    document.getElementById("cancelEdit");

const editStudentForm =
    document.getElementById("editStudentForm");


// Delete Modal

const deleteModal =
    document.getElementById("deleteModal");

const cancelDelete =
    document.getElementById("cancelDelete");

const confirmDelete =
    document.getElementById("confirmDelete");





function displayStudents() {


    studentsTable.innerHTML = "";



    students.forEach((student, index) => {



        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>

                <button onclick="openEditModal(${index})">
                    Edit
                </button>

                <button onclick="openDeleteModal(${index})">
                    Delete
                </button>

            </td>

        `;



        studentsTable.appendChild(row);

    });

}




openAddModal.addEventListener("click", function () {

    addModal.style.display = "flex";

});


// إغلاق Popup الإضافة

cancelAdd.addEventListener("click", function () {

    addModal.style.display = "none";

});




addStudentForm.addEventListener("submit", function (event) {

  

    event.preventDefault();



    const id =
        document.getElementById("studentId").value;

    const name =
        document.getElementById("studentName").value;

    const course =
        document.getElementById("studentCourse").value;



    const newStudent = {

        id: id,

        name: name,

        course: course

    };


    students.push(newStudent);


  

    displayStudents();



    addStudentForm.reset();



    addModal.style.display = "none";

});




function openEditModal(index) {


    selectedStudentIndex = index;



    const student =
        students[index];



    document.getElementById("editStudentId").value =
        student.id;

    document.getElementById("editStudentName").value =
        student.name;

    document.getElementById("editStudentCourse").value =
        student.course;


    

    editModal.style.display = "flex";

}




cancelEdit.addEventListener("click", function () {

    editModal.style.display = "none";

});





editStudentForm.addEventListener("submit", function (event) {

    event.preventDefault();



    students[selectedStudentIndex].id =
        document.getElementById("editStudentId").value;


    students[selectedStudentIndex].name =
        document.getElementById("editStudentName").value;


    students[selectedStudentIndex].course =
        document.getElementById("editStudentCourse").value;



    displayStudents();



    editModal.style.display = "none";

});





function openDeleteModal(index) {


    selectedStudentIndex = index;


    // فتح Popup

    deleteModal.style.display = "flex";

}



cancelDelete.addEventListener("click", function () {

    deleteModal.style.display = "none";

});




confirmDelete.addEventListener("click", function () {

    students.splice(selectedStudentIndex, 1);



    displayStudents();



    deleteModal.style.display = "none";

});




displayStudents();