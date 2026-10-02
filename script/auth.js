// Import API functions for fetching and creating instructor users
import { fetchUsers, createInstructorUser } from './api.js';

// Key used to store the active user in sessionStorage
const CURRENT_USER_KEY = 'eduTrackActiveUser';

//Register a new instructor
export async function registerInstructor({fullName, email,specialization,password}) {
    // Get all existing instructors
  const existingUsers = await fetchUsers();
// Check if the entered email is already registered
  const isEmailTaken = existingUsers.some(
    user => user.email.toLowerCase() === email.toLowerCase()
  );
 // Return an error if the email already exists
  if (isEmailTaken) {
    return {
      success: false,
      message: 'Email address is already registered!'
    };
  }
 // Create the new instructor data
  const newInstructorData = {fullName,email,specialization,password,role: 'Instructor'};

  // Send the new instructor data to the API
  const createdUser = await createInstructorUser(newInstructorData);
  // Return a successful registration result
  return { success: true, user: createdUser};
}


 // Authenticate an instructor using email and password
export async function authenticateUser(email, password) {
  // Get all registered instructors
  const users = await fetchUsers();
  // Find a user with matching email and password
  const matchedUser = users.find(
    user =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  // If a matching user is found, save them as the active user
  if (matchedUser) {
   sessionStorage.setItem(CURRENT_USER_KEY,JSON.stringify(matchedUser));
  // Return a successful login result
    return {success: true,user: matchedUser
    };
  }

    // Return an error if the login credentials are incorrect
  return {
    success: false,
    message: 'Invalid email address or password'
  };
}

// Get the currently logged-in instructor from sessionStorage
export function getActiveUser() {
    // Get the stored active user
  const userData =sessionStorage.getItem(CURRENT_USER_KEY);
 // Convert the stored JSON string back into an object
  if (userData) {
    return JSON.parse(userData);
} else {
      // Return null if no user is logged in
    return null;
}
}

// Log out the current user
export function logoutUser() {

 sessionStorage.removeItem(CURRENT_USER_KEY);
 
  // Redirect the user to the login page
  window.location.href = 'login.html';
}
