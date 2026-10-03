let archiveInitialized = false;

export function initArchive() {

    // نمنع تسجيل الـ listener أكثر من مرة
    if (archiveInitialized) {
        return;
    }

    archiveInitialized = true;

    document.addEventListener("click", function (event) {

        let archiveButton = event.target.closest(".archive-btn");

        if (!archiveButton) {
            return;
        }

        let studentId = archiveButton.dataset.id;

        softDeleted(studentId);
    });

}


function softDeleted(id) {

    fetch(`http://localhost:3000/students/${id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            deleted: true
        })

    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to archive student: " + response.status);
            }

            return response.json();
        })

        .then(data => {

            console.log("Student archived:", data);

            // نخبر صفحة الطلاب تعيد تحميل القائمة
            document.dispatchEvent(new Event("studentArchived"));

        })

        .catch(error => {

            console.log("Archive error:", error);

        });

}