const BASE_API_URL = 'http://localhost:3000';

/*
 Fetch all registered users from the JSON Server API
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_API_URL}/instructors`);

  if (!response.ok) {
    throw new Error('Failed to fetch user records');
  }

  return await response.json();
}

/*
 Register a new instructor user
 */
export async function createInstructorUser(userData) {
  const response = await fetch(`${BASE_API_URL}/instructors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Failed to create new account');
  }

  return await response.json();
}
