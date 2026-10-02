// =========================================
// STUDENT DATA
// =========================================

let student = {

    name: "Ahmad Khalil",

    id: "ST-001",

    email: "ahmad@example.com",

    course: "JavaScript",

    attendance: 92,

    assignment: 85,

    quiz: 90,

    exam: 88,

    feedback: []

};


// =========================================
// CALCULATE OVERALL GRADE
// =========================================

function calculateOverall() {

    let overall =
        student.assignment * 0.30 +
        student.quiz * 0.20 +
        student.exam * 0.50;

    return Math.round(overall);

}


// =========================================
// DISPLAY STUDENT
// =========================================

function displayStudent() {

    const overall = calculateOverall();


    // Student Information

    document.getElementById("studentName").textContent =
        student.name;

    document.getElementById("studentId").textContent =
        student.id;

    document.getElementById("studentEmail").textContent =
        student.email;

    document.getElementById("studentCourse").textContent =
        student.course;


    // Header scores

    document.getElementById("overallGrade").textContent =
        overall;

    document.getElementById("attendanceScore").textContent =
        student.attendance;

    document.getElementById("assignmentScore").textContent =
        student.assignment;

    document.getElementById("quizScore").textContent =
        student.quiz;

    document.getElementById("examScore").textContent =
        student.exam;


    // Circles

    document.getElementById("overallCircle").textContent =
        overall + "%";

    document.getElementById("attendanceCircle").textContent =
        student.attendance + "%";

    document.getElementById("assignmentCircle").textContent =
        student.assignment + "%";

    document.getElementById("quizCircle").textContent =
        student.quiz + "%";

    document.getElementById("examCircle").textContent =
        student.exam + "%";


    // Overview

    document.getElementById("overviewGrade").textContent =
        overall + "%";

    document.getElementById("overviewAttendance").textContent =
        student.attendance + "%";

    document.getElementById("overviewAssignments").textContent =
        student.assignment + "%";

    document.getElementById("overviewQuizzes").textContent =
        student.quiz + "%";

    document.getElementById("overviewExams").textContent =
        student.exam + "%";


    // Grades

    updateProgress(
        "assignmentBar",
        "assignmentProgressText",
        student.assignment
    );

    updateProgress(
        "quizBar",
        "quizProgressText",
        student.quiz
    );

    updateProgress(
        "examBar",
        "examProgressText",
        student.exam
    );

    updateProgress(
        "finalGradeBar",
        "finalGradeText",
        overall
    );


    // Attendance

    document.getElementById("presentBar").style.width =
        student.attendance + "%";

    document.getElementById("presentText").textContent =
        student.attendance + "%";


    const absence = 100 - student.attendance;


    document.getElementById("absenceBar").style.width =
        absence + "%";

    document.getElementById("absenceText").textContent =
        absence + "%";


    // Assignments Tab

    updateProgress(
        "assignmentAssessmentBar",
        "assignmentAssessmentText",
        student.assignment
    );

    updateProgress(
        "quizAssessmentBar",
        "quizAssessmentText",
        student.quiz
    );

    updateProgress(
        "examAssessmentBar",
        "examAssessmentText",
        student.exam
    );


    // Feedback placeholder

    document.getElementById("feedbackInput").placeholder =
        "Write feedback for " + student.name.split(" ")[0] + "...";

}


// =========================================
// UPDATE PROGRESS
// =========================================

function updateProgress(barId, textId, value) {

    document.getElementById(barId).style.width =
        value + "%";

    document.getElementById(textId).textContent =
        value;

}


// =========================================
// TABS
// =========================================

const tabs = document.querySelectorAll(".tab");

const contents =
    document.querySelectorAll(".tab-content");


tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        // Remove active from all tabs

        tabs.forEach(function (item) {

            item.classList.remove("active");

        });


        // Hide all content

        contents.forEach(function (content) {

            content.classList.remove("active");

        });


        // Activate clicked tab

        tab.classList.add("active");


        const tabName =
            tab.getAttribute("data-tab");


        document
            .getElementById(tabName)
            .classList.add("active");

    });

});


// =========================================
// EDIT STUDENT MODAL
// =========================================

const editModal =
    document.getElementById("editModal");


document
    .getElementById("editStudentBtn")
    .addEventListener("click", function () {


        // Put current data in form

        document.getElementById("editName").value =
            student.name;

        document.getElementById("editId").value =
            student.id;

        document.getElementById("editEmail").value =
            student.email;

        document.getElementById("editCourse").value =
            student.course;

        document.getElementById("editAttendance").value =
            student.attendance;

        document.getElementById("editAssignment").value =
            student.assignment;

        document.getElementById("editQuiz").value =
            student.quiz;

        document.getElementById("editExam").value =
            student.exam;


        editModal.classList.add("show");

    });


// Cancel

document
    .getElementById("cancelEdit")
    .addEventListener("click", function () {

        editModal.classList.remove("show");

    });


// =========================================
// SAVE EDIT
// =========================================

document
    .getElementById("editStudentForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        student.name =
            document.getElementById("editName").value;

        student.id =
            document.getElementById("editId").value;

        student.email =
            document.getElementById("editEmail").value;

        student.course =
            document.getElementById("editCourse").value;

        student.attendance =
            Number(
                document.getElementById("editAttendance").value
            );

        student.assignment =
            Number(
                document.getElementById("editAssignment").value
            );

        student.quiz =
            Number(
                document.getElementById("editQuiz").value
            );

        student.exam =
            Number(
                document.getElementById("editExam").value
            );


        // Update page

        displayStudent();


        // Close modal

        editModal.classList.remove("show");

    });


// =========================================
// CLOSE MODAL WHEN CLICKING BACKGROUND
// =========================================

editModal.addEventListener("click", function (event) {

    if (event.target === editModal) {

        editModal.classList.remove("show");

    }

});


// =========================================
// FEEDBACK
// =========================================

const feedbackInput =
    document.getElementById("feedbackInput");


document
    .getElementById("postFeedbackBtn")
    .addEventListener("click", addFeedback);


function addFeedback() {

    const text =
        feedbackInput.value.trim();


    if (text === "") {

        alert("Please write feedback first.");

        return;

    }


    student.feedback.push(text);


    feedbackInput.value = "";


    displayFeedback();

}


// =========================================
// DISPLAY FEEDBACK
// =========================================

function displayFeedback() {

    const feedbackList =
        document.getElementById("feedbackList");


    // Clear current list

    feedbackList.innerHTML = "";


    // Empty

    if (student.feedback.length === 0) {

        feedbackList.innerHTML = `

            <div class="empty-feedback">

                <i class="fa-solid fa-comments"></i>

                <h3>No feedback yet</h3>

                <p>Add your first note above.</p>

            </div>

        `;

        return;

    }


    // Display feedback

    student.feedback.forEach(function (feedback) {

        const feedbackItem =
            document.createElement("div");


        feedbackItem.classList.add("feedback-item");


        feedbackItem.textContent =
            feedback;


        feedbackList.appendChild(feedbackItem);

    });

}


// =========================================
// GENERATE PDF REPORT
// =========================================

document
    .getElementById("generateReportBtn")
    .addEventListener("click", generateReport);


function generateReport() {

    const report =
        document.getElementById("studentReport");


    const overall =
        calculateOverall();


    // =========================
    // Student Information
    // =========================

    document.getElementById("reportName").textContent =
        student.name;

    document.getElementById("reportId").textContent =
        student.id;

    document.getElementById("reportEmail").textContent =
        student.email;

    document.getElementById("reportCourse").textContent =
        student.course;


    // =========================
    // Scores
    // =========================

    document.getElementById("reportGrade").textContent =
        overall + "%";

    document.getElementById("reportAttendance").textContent =
        student.attendance + "%";

    document.getElementById("reportAssignment").textContent =
        student.assignment + "%";

    document.getElementById("reportQuiz").textContent =
        student.quiz + "%";

    document.getElementById("reportExam").textContent =
        student.exam + "%";


    // =========================
    // Date
    // =========================

    const today = new Date();


    document.getElementById("reportDate").textContent =
        today.toLocaleDateString();


    // =========================
    // Feedback
    // =========================

    const reportFeedback =
        document.getElementById("reportFeedback");


    if (student.feedback.length === 0) {

        reportFeedback.textContent =
            "No instructor feedback available.";

    }

    else {

        reportFeedback.innerHTML = "";


        student.feedback.forEach(function (feedback) {

            const paragraph =
                document.createElement("p");


            paragraph.textContent =
                "• " + feedback;


            paragraph.style.marginBottom =
                "7px";


            reportFeedback.appendChild(paragraph);

        });

    }


    // =========================
    // Show Report
    // =========================

    report.style.display =
        "block";


    // =========================
    // PDF Options
    // =========================

    const options = {

        margin: 0.3,

        filename:
            student.name.replaceAll(" ", "-") +
            "-Report.pdf",

        image: {

            type: "jpeg",

            quality: 0.98

        },

        html2canvas: {

            scale: 2

        },

        jsPDF: {

            unit: "in",

            format: "a4",

            orientation: "portrait"

        }

    };


    // =========================
    // Generate
    // =========================

    html2pdf()

        .set(options)

        .from(report)

        .save()

        .then(function () {

            report.style.display =
                "none";

        });

}


// =========================================
// FIRST PAGE LOAD
// =========================================

displayStudent();

displayFeedback();