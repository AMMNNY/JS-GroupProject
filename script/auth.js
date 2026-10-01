import { fetchUsers, createInstructorUser } from './api.js';

const CURRENT_USER_KEY = 'eduTrackActiveUser';

/*
  Register instructor
 */
export async function registerInstructor({
  fullName,
  email,
  specialization,
  password
}) {
  const existingUsers = await fetchUsers();

  const isEmailTaken = existingUsers.some(
    user => user.email.toLowerCase() === email.toLowerCase()
  );

  if (isEmailTaken) {
    return {
      success: false,
      message: 'Email address is already registered!'
    };
  }

  const newInstructorData = {
    fullName,
    email,
    specialization,
    password,
    role: 'Instructor'
  };

  const createdUser = await createInstructorUser(newInstructorData);

  return {
    success: true,
    user: createdUser
  };
}

/**
 * Login
 */
export async function authenticateUser(email, password) {
  const users = await fetchUsers();

  const matchedUser = users.find(
    user =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (matchedUser) {
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(matchedUser)
    );

    return {
      success: true,
      user: matchedUser
    };
  }

  return {
    success: false,
    message: 'Invalid email address or password'
  };
}

/*
  Get active user
 */
export function getActiveUser() {
  const userData = localStorage.getItem(CURRENT_USER_KEY);

  return userData ? JSON.parse(userData) : null;
}

/*
  Logout
 */
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);

  window.location.href = 'login.html';
}
