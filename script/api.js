// Base URL for the JSON Server API
const BASE_API_URL = 'http://localhost:3000';

/*
 Fetch all registered users from the JSON Server API
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_API_URL}/instructors`);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error('Failed to fetch user records');
  }
 // Convert the response to JSON and return the users
  return await response.json();
}

/*
  Create a new instructor account in the JSON Server API
 */
export async function createInstructorUser(userData) {
  const response = await fetch(`${BASE_API_URL}/instructors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Convert the user object into JSON before sending it
    body: JSON.stringify(userData)
  });
 // Check if the account creation request was successful
  if (!response.ok) {
    throw new Error('Failed to create new account');
  }

  // Convert the response to JSON and return the created user
  return await response.json();
}

//update an existing user's data in the JSON Server
export async function updateUser(userId, userData){

  //send a PATCH request to update the user's information 
  const response = await fetch(`${BASE_API_URL}/instructors/${userId}`,
    {method:"PATCH",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify(userData)});
  return await response.json();

  }
