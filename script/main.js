
// Import authentication functions
import {authenticateUser,registerInstructor,getActiveUser,logoutUser} from './auth.js';
// Import UI feedback function
import {renderFeedbackMessage} from './ui.js';

// Run the code after the HTML page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
   // Get the currently logged-in user from sessionStorage
  const activeUser = getActiveUser();

    // Get the current page path
  const currentPath = window.location.pathname;


  // Check if the current page is the dashboard
  if (
    currentPath.includes('index.html') ||
    currentPath.endsWith('/')
  ) {
    // Redirect to login if no user is logged in
    if (!activeUser) {
      window.location.href = 'login.html';
      return;
    }
     // Initialize the dashboard for the logged-in user
    initializeDashboard(activeUser);
  }



  //registerForm
   // Get the registration form from the HTML
  const registerFormElement = document.getElementById('registerForm');

  if (registerFormElement) {
     // Handle registration form submission
    registerFormElement.addEventListener('submit',async event => {
       // Prevent the page from refreshing
        event.preventDefault();
    // Get the values entered by the user
        const fullName =
          document.getElementById('registerFullName') .value.trim();

        const email =document.getElementById('registerEmail').value.trim();

        const specialization =document.getElementById('registerSpecialization').value.trim();

        const password =document.getElementById('registerPassword').value;

        // Try to create the new instructor account
        try {
          const result =await registerInstructor({fullName,email,specialization,password });

             // Check if registration was successful
          if (result.success) {
            // Display success message
            renderFeedbackMessage('registerFeedback','Account created successfully!');
             // Redirect to login page
             window.location.href = 'login.html';
           } 

          else {
              // Display registration error message
            renderFeedbackMessage('registerFeedback',result.message,true);
          }
        } catch (error) {
           // Display server connection error
          renderFeedbackMessage('registerFeedback','Server connection error',true);
        }
      }
    );
  }





//login 
 // Get the login form from the HTML
  const loginFormElement = document.getElementById('loginForm');

  if (loginFormElement) {
     // Handle login form submission
    loginFormElement.addEventListener('submit',async event => {
        // Prevent the page from refreshing
        event.preventDefault();

      // Get the login credentials entered by the user
        const email = document.getElementById('loginEmail').value.trim();

        const password =document.getElementById('loginPassword').value;

        // Try to authenticate the user
        try {
          const result =await authenticateUser(email,password);

         // Check if login was successful
          if (result.success) {
            // Display success message
           renderFeedbackMessage('loginFeedback','Signed in successfully!');

            // Redirect to the dashboard
         window.location.href = '../index.html';
          } else {
             // Display invalid login message
            renderFeedbackMessage('loginFeedback',result.message, true);
          }
        } catch (error) {
            // Display server connection error
          renderFeedbackMessage('loginFeedback','Unable to connect to JSON Server', true);
        }
      }
    );
  }
});






// Initialize the dashboard for the logged-in instructor
 
async function initializeDashboard(activeUser) {
   // Get the instructor name display element
  const nameDisplayElement =document.getElementById('instructorNameDisplay');
  // Get the logout button
  const logoutBtnElement =document.getElementById('logoutButton');
  // Display the logged-in instructor's name
  if (nameDisplayElement) {
    nameDisplayElement.textContent =`Welcome, ${activeUser.fullName}`;
  }
  // Add logout functionality to the logout button
  if (logoutBtnElement) {
    logoutBtnElement.addEventListener('click',logoutUser);
  }

  
}