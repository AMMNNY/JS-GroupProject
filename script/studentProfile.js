// =========================================
// API
// =========================================

const BASE_URL = "http://localhost:3000/students";

let student = null;


// =========================================
// GET STUDENT ID FROM URL
// Example:
// StudentProfile.html?id=S001
// =========================================

const params = new URLSearchParams(window.location.search);

const studentDatabaseId = params.get("id");


// =========================================
// GET STUDENT FROM JSON SERVER
// =========================================

async function getStudent() {

    try {

        if (!studentDatabaseId) {

            throw new Error("Student ID is missing from URL");

        }


        const response = await fetch(
            `${BASE_URL}/${studentDatabaseId}`
        );


        if (!response.ok) {

            throw new Error("Student not found");

        }


        const data = await response.json();


        // Convert db.json structure to the structure
        // used by the Student Profile page

        student = {

            dbId: data.id,

            instructorId: data.instructorId,

            name: data.name,

            id: data.studentId,

            email: data.email || "No email",

            course: data.course || "No course",

            attendance:
                Number(data.attendance) || 0,

            assignment:
                Number(data.grades?.assignments) || 0,

            quiz:
                Number(data.grades?.quizzes) || 0,

            exam:
                Number(data.grades?.exam) || 0,

            feedback:
                data.feedback
                    ? [data.feedback]
                    : [],

            status:
                data.status || "Active"

        };


        displayStudent();

        displayFeedback();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


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
// CALCULATE GPA
// GPA = Overall converted to 4.00 scale
// =========================================

function calculateGPA() {

    const overall = calculateOverall();

    const gpa =
        (overall / 100) * 4;


    return gpa.toFixed(2);

}


// =========================================
// GET STUDENT INITIALS
// =========================================

function getInitials(name) {

    if (!name) {

        return "--";

    }


    const words =
        name.trim().split(" ");


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}


// =========================================
// DISPLAY STUDENT
// =========================================

function displayStudent() {

    if (!student) {

        return;

    }


    const overall =
        calculateOverall();


    const gpa =
        calculateGPA();


    // =====================================
    // Student Information
    // =====================================

    document.getElementById(
        "studentName"
    ).textContent =
        student.name;


    document.getElementById(
        "studentId"
    ).textContent =
        student.id;


    document.getElementById(
        "studentEmail"
    ).textContent =
        student.email;


    document.getElementById(
        "studentCourse"
    ).textContent =
        student.course;


    document.getElementById(
        "studentStatus"
    ).textContent =
        student.status;


    document.getElementById(
        "studentAvatar"
    ).textContent =
        getInitials(student.name);


    // =====================================
    // Header Scores
    // =====================================

    document.getElementById(
        "overallGrade"
    ).textContent =
        overall;


    document.getElementById(
        "gpaScore"
    ).textContent =
        gpa;


    document.getElementById(
        "attendanceScore"
    ).textContent =
        student.attendance;


    document.getElementById(
        "assignmentScore"
    ).textContent =
        student.assignment;


    document.getElementById(
        "quizScore"
    ).textContent =
        student.quiz;


    document.getElementById(
        "examScore"
    ).textContent =
        student.exam;


    // =====================================
    // Circles
    // =====================================

    document.getElementById(
        "overallCircle"
    ).textContent =
        overall + "%";


    document.getElementById(
        "gpaCircle"
    ).textContent =
        gpa;


    document.getElementById(
        "attendanceCircle"
    ).textContent =
        student.attendance + "%";


    document.getElementById(
        "assignmentCircle"
    ).textContent =
        student.assignment + "%";


    document.getElementById(
        "quizCircle"
    ).textContent =
        student.quiz + "%";


    document.getElementById(
        "examCircle"
    ).textContent =
        student.exam + "%";


    // =====================================
    // Overview
    // =====================================

    document.getElementById(
        "overviewGrade"
    ).textContent =
        overall + "%";


    document.getElementById(
        "overviewGPA"
    ).textContent =
        gpa + " / 4.00";


    document.getElementById(
        "overviewAttendance"
    ).textContent =
        student.attendance + "%";


    document.getElementById(
        "overviewAssignments"
    ).textContent =
        student.assignment + "%";


    document.getElementById(
        "overviewQuizzes"
    ).textContent =
        student.quiz + "%";


    document.getElementById(
        "overviewExams"
    ).textContent =
        student.exam + "%";


    // =====================================
    // Grades
    // =====================================

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


    // =====================================
    // Attendance
    // =====================================

    document.getElementById(
        "presentBar"
    ).style.width =
        student.attendance + "%";


    document.getElementById(
        "presentText"
    ).textContent =
        student.attendance + "%";


    const absence =
        100 - student.attendance;


    document.getElementById(
        "absenceBar"
    ).style.width =
        absence + "%";


    document.getElementById(
        "absenceText"
    ).textContent =
        absence + "%";


    // =====================================
    // Assignments Tab
    // =====================================

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


    // =====================================
    // Feedback Placeholder
    // =====================================

    document.getElementById(
        "feedbackInput"
    ).placeholder =

        "Write feedback for " +

        student.name.split(" ")[0] +

        "...";

}


// =========================================
// UPDATE PROGRESS
// =========================================

function updateProgress(
    barId,
    textId,
    value
) {

    document.getElementById(
        barId
    ).style.width =
        value + "%";


    document.getElementById(
        textId
    ).textContent =
        value;

}


// =========================================
// TABS
// =========================================

const tabs =
    document.querySelectorAll(".tab");


const contents =
    document.querySelectorAll(
        ".tab-content"
    );


tabs.forEach(function (tab) {

    tab.addEventListener(
        "click",
        function () {


            tabs.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            contents.forEach(
                function (content) {

                    content.classList.remove(
                        "active"
                    );

                }
            );


            tab.classList.add(
                "active"
            );


            const tabName =
                tab.getAttribute(
                    "data-tab"
                );


            document
                .getElementById(
                    tabName
                )
                .classList.add(
                    "active"
                );

        }
    );

});


// =========================================
// EDIT STUDENT MODAL
// =========================================

const editModal =
    document.getElementById(
        "editModal"
    );


document
    .getElementById(
        "editStudentBtn"
    )
    .addEventListener(
        "click",
        function () {


            if (!student) {

                return;

            }


            document.getElementById(
                "editName"
            ).value =
                student.name;


            document.getElementById(
                "editId"
            ).value =
                student.id;


            document.getElementById(
                "editEmail"
            ).value =
                student.email === "No email"
                    ? ""
                    : student.email;


            document.getElementById(
                "editCourse"
            ).value =
                student.course;


            document.getElementById(
                "editAttendance"
            ).value =
                student.attendance;


            document.getElementById(
                "editAssignment"
            ).value =
                student.assignment;


            document.getElementById(
                "editQuiz"
            ).value =
                student.quiz;


            document.getElementById(
                "editExam"
            ).value =
                student.exam;


            editModal.classList.add(
                "show"
            );

        }
    );


// =========================================
// CANCEL EDIT
// =========================================

document
    .getElementById(
        "cancelEdit"
    )
    .addEventListener(
        "click",
        function () {

            editModal.classList.remove(
                "show"
            );

        }
    );


// =========================================
// SAVE EDIT TO DB.JSON
// =========================================

document
    .getElementById(
        "editStudentForm"
    )
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!student) {

                return;

            }


            const updatedStudent = {

                instructorId:
                    student.instructorId,

                studentId:
                    document.getElementById(
                        "editId"
                    ).value,

                name:
                    document.getElementById(
                        "editName"
                    ).value,

                email:
                    document.getElementById(
                        "editEmail"
                    ).value,

                course:
                    document.getElementById(
                        "editCourse"
                    ).value,

                attendance:
                    Number(
                        document.getElementById(
                            "editAttendance"
                        ).value
                    ),

                grades: {

                    assignments:
                        Number(
                            document.getElementById(
                                "editAssignment"
                            ).value
                        ),

                    quizzes:
                        Number(
                            document.getElementById(
                                "editQuiz"
                            ).value
                        ),

                    exam:
                        Number(
                            document.getElementById(
                                "editExam"
                            ).value
                        )

                },

                feedback:
                    student.feedback.join(" | "),

                status:
                    student.status

            };


            try {

                const response =
                    await fetch(
                        `${BASE_URL}/${student.dbId}`,
                        {

                            method: "PATCH",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    updatedStudent
                                )

                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Failed to update student"
                    );

                }


                editModal.classList.remove(
                    "show"
                );


                await getStudent();


                alert(
                    "Student updated successfully."
                );

            }

            catch (error) {

                console.error(error);

                alert(
                    "Could not update student."
                );

            }

        }
    );


// =========================================
// CLOSE MODAL WHEN CLICKING BACKGROUND
// =========================================

editModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === editModal
        ) {

            editModal.classList.remove(
                "show"
            );

        }

    }
);


// =========================================
// FEEDBACK
// =========================================

const feedbackInput =
    document.getElementById(
        "feedbackInput"
    );


document
    .getElementById(
        "postFeedbackBtn"
    )
    .addEventListener(
        "click",
        addFeedback
    );


// =========================================
// ADD FEEDBACK
// =========================================

async function addFeedback() {

    if (!student) {

        return;

    }


    const text =
        feedbackInput.value.trim();


    if (text === "") {

        alert(
            "Please write feedback first."
        );

        return;

    }


    student.feedback.push(text);


    const feedbackString =
        student.feedback.join(" | ");


    try {

        const response =
            await fetch(
                `${BASE_URL}/${student.dbId}`,
                {

                    method: "PATCH",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            feedback:
                                feedbackString

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to save feedback"
            );

        }


        feedbackInput.value = "";


        displayFeedback();

    }

    catch (error) {

        console.error(error);

        alert(
            "Could not save feedback."
        );

    }

}


// =========================================
// DISPLAY FEEDBACK
// =========================================

function displayFeedback() {

    if (!student) {

        return;

    }


    const feedbackList =
        document.getElementById(
            "feedbackList"
        );


    feedbackList.innerHTML = "";


    if (
        student.feedback.length === 0
    ) {

        feedbackList.innerHTML = `

            <div class="empty-feedback">

                <i class="fa-solid fa-comments"></i>

                <h3>No feedback yet</h3>

                <p>
                    Add your first note above.
                </p>

            </div>

        `;


        return;

    }


    student.feedback.forEach(
        function (feedback) {


            const feedbackItem =
                document.createElement(
                    "div"
                );


            feedbackItem.classList.add(
                "feedback-item"
            );


            feedbackItem.textContent =
                feedback;


            feedbackList.appendChild(
                feedbackItem
            );

        }
    );

}


// =========================================
// GENERATE PDF REPORT
// =========================================

document
    .getElementById(
        "generateReportBtn"
    )
    .addEventListener(
        "click",
        generateReport
    );


function generateReport() {

    if (!student) {

        return;

    }


    const report =
        document.getElementById(
            "studentReport"
        );


    const overall =
        calculateOverall();


    const gpa =
        calculateGPA();


    // =====================================
    // Student Information
    // =====================================

    document.getElementById(
        "reportName"
    ).textContent =
        student.name;


    document.getElementById(
        "reportId"
    ).textContent =
        student.id;


    document.getElementById(
        "reportEmail"
    ).textContent =
        student.email;


    document.getElementById(
        "reportCourse"
    ).textContent =
        student.course;


    // =====================================
    // Scores
    // =====================================

    document.getElementById(
        "reportGrade"
    ).textContent =
        overall + "%";


    document.getElementById(
        "reportGPA"
    ).textContent =
        gpa + " / 4.00";


    document.getElementById(
        "reportAttendance"
    ).textContent =
        student.attendance + "%";


    document.getElementById(
        "reportAssignment"
    ).textContent =
        student.assignment + "%";


    document.getElementById(
        "reportQuiz"
    ).textContent =
        student.quiz + "%";


    document.getElementById(
        "reportExam"
    ).textContent =
        student.exam + "%";


    // =====================================
    // Date
    // =====================================

    const today =
        new Date();


    document.getElementById(
        "reportDate"
    ).textContent =
        today.toLocaleDateString();


    // =====================================
    // Feedback
    // =====================================

    const reportFeedback =
        document.getElementById(
            "reportFeedback"
        );


    if (
        student.feedback.length === 0
    ) {

        reportFeedback.textContent =
            "No instructor feedback available.";

    }

    else {

        reportFeedback.innerHTML = "";


        student.feedback.forEach(
            function (feedback) {


                const paragraph =
                    document.createElement(
                        "p"
                    );


                paragraph.textContent =
                    "• " + feedback;


                paragraph.style.marginBottom =
                    "7px";


                reportFeedback.appendChild(
                    paragraph
                );

            }
        );

    }


    // =====================================
    // Show Report
    // =====================================

    report.style.display =
        "block";


    // =====================================
    // PDF Options
    // =====================================

    const options = {

        margin: 0.3,

        filename:

            student.name.replaceAll(
                " ",
                "-"
            ) +

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


    // =====================================
    // Generate PDF
    // =====================================

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

getStudent();