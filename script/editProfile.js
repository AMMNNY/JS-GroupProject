import { updateUser } from './api.js';
import { getActiveUser } from './auth.js';

const saveBtn = document.getElementById("save");

saveBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    // 1. Fetch current logged-in user from sessionStorage
    const activeUser = getActiveUser();

    // 2. Validate session existence to prevent runtime errors
    if (!activeUser || !activeUser.id) {
        alert("Session expired or user not logged in. Please sign in again.");
        window.location.href = 'login.html';
        return;
    }

    // 3. Get updated form input values
    const fullName = document.getElementById("instructor-name").value;
    const email = document.getElementById("email").value;

    try {
        // 4. Send PATCH request to update backend user details
        const updatedUser = await updateUser(activeUser.id, {
            fullName: fullName,
            email: email
        });

        // 5. Sync updated user record back to sessionStorage using the matching key
        sessionStorage.setItem(
            'eduTrackActiveUser',
            JSON.stringify(updatedUser)
        );

       
        window.location.href = 'login.html';
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again later.");
    }
});