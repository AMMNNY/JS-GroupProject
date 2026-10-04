export default function coursesFunction(){
let coursesContainer = document.getElementById("coursesContainer")
let gridViewBtn = document.getElementById("gridViewBtn")
let listViewBtn = document.getElementById("listViewBtn")

gridViewBtn.addEventListener("click", () => {
    coursesContainer.classList.add("courses-grid")
    coursesContainer.classList.remove("courses-list")
    gridViewBtn.classList.add("active")
    gridViewBtn.setAttribute("aria-pressed", "true")
    listViewBtn.classList.remove("active")
    listViewBtn.setAttribute("aria-pressed", "false")
})

listViewBtn.addEventListener("click", () => {
    coursesContainer.classList.add("courses-list")
    coursesContainer.classList.remove("courses-grid")
    listViewBtn.classList.add("active")
    listViewBtn.setAttribute("aria-pressed", "true")
    gridViewBtn.classList.remove("active")
    gridViewBtn.setAttribute("aria-pressed", "false")
})

let courseName = document.getElementById("courseName")
let courseDescription = document.getElementById("courseDescription")
let instructor = document.getElementById("instructor")

let form = document.getElementById("courseForm")
let cancelBtn = document.getElementById("cancelBtn")
let modal = document.getElementById("courseModal")
let openModal = document.getElementById("openModal")

let editModal = document.getElementById("editCourseModal")
let editForm = document.getElementById("editCourseForm")
let editCourseName = document.getElementById("editCourseName")
let editCourseDescription = document.getElementById("editCourseDescription")
let editInstructor = document.getElementById("editInstructor")
let editCancelBtn = document.getElementById("editCancelBtn")
let deleteConfirmationModal = document.getElementById("deleteConfirmationModal")
let cancelDeleteBtn = document.getElementById("cancelDeleteBtn")
let confirmDeleteBtn = document.getElementById("confirmDeleteBtn")
let selectedCourseId
let selectedDeleteCourseId

async function loadInstructors() {
    const response = await fetch("http://localhost:3000/instructors")
    if (!response.ok) {
        throw new Error("Could not load instructors.")
    }

    const instructors = await response.json()

    instructors.forEach(e => {
        const option = document.createElement("option")
        option.value = e.id
        option.textContent = e.name || e.fullName

        instructor.appendChild(option.cloneNode(true))
        editInstructor.appendChild(option)
    })
}

async function getData() {
    try {
        const response = await fetch("http://localhost:3000/courses")
        if (!response.ok) {
            throw new Error("Could not load courses.")
        }

        const data = await response.json()
        coursesContainer.innerHTML = ""

        data.forEach(e => {
            let courseCard = document.createElement("article")
            let courseContent = document.createElement("div")
            let courseTitle = document.createElement("h3")
            let description = document.createElement("p")
            let edit = document.createElement("button")
            let deletee = document.createElement("button")

            edit.addEventListener("click", () => {
                selectedCourseId = e.id
                modal.style.display = "none"
                editModal.style.display = "flex"

                editCourseName.value = e.name
                editCourseDescription.value = e.description
                editInstructor.value = e.instructor
            })
            deletee.addEventListener("click", () => {
                selectedDeleteCourseId = e.id
                deleteConfirmationModal.style.display = "flex"
            })
            courseTitle.textContent = e.name
            description.textContent = e.description
            edit.textContent = "Edit"
            deletee.textContent = "Delete"

            courseContent.appendChild(courseTitle)
            courseContent.appendChild(description)
            courseContent.appendChild(edit)
            courseContent.appendChild(deletee)

            courseCard.appendChild(courseContent)
            coursesContainer.appendChild(courseCard)
        })

    } catch(error) {
        console.log(error)
    }
}

cancelDeleteBtn.addEventListener("click", () => {
    deleteConfirmationModal.style.display = "none"
    selectedDeleteCourseId = undefined
})

confirmDeleteBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`http://localhost:3000/courses/${selectedDeleteCourseId}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Could not delete course ${selectedDeleteCourseId}: ${response.status} ${response.statusText}`)
        }

        deleteConfirmationModal.style.display = "none"
        selectedDeleteCourseId = undefined
        await getData()
    } catch(error) {
        console.error(error)
    }
})

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none"
})

editCancelBtn.addEventListener("click", () => {
    editModal.style.display = "none"
    selectedCourseId = undefined
})

openModal.addEventListener("click", () => {
    editModal.style.display = "none"
    modal.style.display = "flex"
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const addCourse = {
        name: courseName.value,
        description: courseDescription.value,
        instructor: instructor.value
    }

    try {
        const response = await fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addCourse)
        })

        const data = await response.json()
        console.log(data)

        modal.style.display = "none"

    } catch(error) {
        console.log(error)
    }
})

editForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const updatedCourse = {
        name: editCourseName.value,
        description: editCourseDescription.value,
        instructor: editInstructor.value
    }

    try {
        const response = await fetch(`http://localhost:3000/courses/${selectedCourseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCourse)
        })

        if (!response.ok) {
            throw new Error("Could not update course.")
        }

        editModal.style.display = "none"
        selectedCourseId = undefined
        await getData()
    } catch(error) {
        console.log(error)
    }
})

loadInstructors()
    .catch(error => console.error(error))
    .then(getData)
}