let deleteModal = document.getElementById("deleteStudentModal");

let closeDeleteModal = document.getElementById("closeDeleteModal");

let cancelDelete = document.getElementById("cancelDelete");

let confirmDelete = document.getElementById("confirmDelete");


let currentStudentId = null;


// Open Delete Modal

document.addEventListener("click", function (e) {

    let deleteButton = e.target.closest(".delete-btn");

    if (!deleteButton) {
        return;
    }

    currentStudentId = deleteButton.dataset.id;

    deleteModal.classList.add("active");

});


// Close

closeDeleteModal.addEventListener("click", function () {

    deleteModal.classList.remove("active");

});


// Cancel

cancelDelete.addEventListener("click", function () {

    deleteModal.classList.remove("active");

});


// Delete

confirmDelete.addEventListener("click", async function () {

    await fetch(
        `http://localhost:3000/students/${currentStudentId}`,
        {
            method: "DELETE"
        }
    );


    console.log("Student deleted");

    deleteModal.classList.remove("active");

    window.location.reload();

});