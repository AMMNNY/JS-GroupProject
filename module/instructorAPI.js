export async function getInstructorById(instructorId) {
  try {
    const response = await fetch("http://localhost:3000/instructors");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const instructors = await response.json();
    const instructor = instructors.find((inst) => inst.id === instructorId);
    return instructor;
  }catch (error) {
    console.error("Error fetching instructor:", error);
    return null;
  }
}