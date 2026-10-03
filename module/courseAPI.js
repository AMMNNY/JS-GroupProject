export async function fetchCoursesData(url, instructorId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.filter(course => course.instructor === instructorId);
    } catch (error) {
        console.error('Error fetching course data:', error);
        throw error;
    }
}