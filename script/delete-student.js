let confirmDelete = document.getElementById("confirmDelete");
let cancelDelete = document.getElementById("cancelDelete");


// Student ID we want to delete
let currentId = "8CLhlJ27d6E";


// Delete student
confirmDelete.addEventListener("click", async function () {

    let response = await fetch(
        `http://localhost:3000/students/${currentId}`,
        {
            method: "DELETE"
        }
    );

    if (response.ok) {
        console.log("Student deleted successfully");
    }

});