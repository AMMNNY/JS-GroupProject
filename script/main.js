import {
  authenticateUser,
  registerInstructor,
  getActiveUser,
  logoutUser
} from './auth.js';



import {
  renderFeedbackMessage,

} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const activeUser = getActiveUser();
  const currentPath = window.location.pathname;

  if (
    currentPath.includes('index.html') ||
    currentPath.endsWith('/')
  ) {
    if (!activeUser) {
      window.location.href = 'login.html';
      return;
    }

    initializeDashboard(activeUser);
  }

  const registerFormElement =
    document.getElementById('registerForm');

  if (registerFormElement) {
    registerFormElement.addEventListener(
      'submit',
      async event => {
        event.preventDefault();

        const fullName =
          document
            .getElementById('registerFullName')
            .value.trim();

        const email =
          document
            .getElementById('registerEmail')
            .value.trim();

        const specialization =
          document
            .getElementById('registerSpecialization')
            .value.trim();

        const password =
          document
            .getElementById('registerPassword')
            .value;

        try {
          const result =
            await registerInstructor({
              fullName,
              email,
              specialization,
              password
            });

          if (result.success) {
            renderFeedbackMessage(
              'registerFeedback',
              'Account created successfully!'
            );
 window.location.href = 'login.html';
           
          } 
          else {
            renderFeedbackMessage(
              'registerFeedback',
              result.message,
              true
            );
          }
        } catch (error) {
          renderFeedbackMessage(
            'registerFeedback',
            'Server connection error',
            true
          );
        }
      }
    );
  }






  const loginFormElement =
    document.getElementById('loginForm');

  if (loginFormElement) {
    loginFormElement.addEventListener(
      'submit',
      async event => {
        event.preventDefault();

        const email =
          document
            .getElementById('loginEmail')
            .value.trim();

        const password =
          document
            .getElementById('loginPassword')
            .value;

        try {
          const result =
            await authenticateUser(
              email,
              password
            );

          if (result.success) {
            renderFeedbackMessage(
              'loginFeedback',
              'Signed in successfully!'
            );

         window.location.href = 'index.html';
          } else {
            renderFeedbackMessage(
              'loginFeedback',
              result.message,
              true
            );
          }
        } catch (error) {
          renderFeedbackMessage(
            'loginFeedback',
            'Unable to connect to JSON Server',
            true
          );
        }
      }
    );
  }
});

async function initializeDashboard(
  activeUser
) {
  const nameDisplayElement =
    document.getElementById(
      'instructorNameDisplay'
    );

  const logoutBtnElement =
    document.getElementById(
      'logoutButton'
    );

  if (nameDisplayElement) {
    nameDisplayElement.textContent =
      `Welcome, ${activeUser.fullName}`;
  }

  if (logoutBtnElement) {
    logoutBtnElement.addEventListener(
      'click',
      logoutUser
    );
  }

  try {
    const instructorStudents =
      await fetchStudentsByInstructorId(
        activeUser.id
      );

    populateStudentsTable(
      instructorStudents
    );
  } catch (error) {
    console.error(error);
  }
}