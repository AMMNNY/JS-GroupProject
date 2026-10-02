export async function fetchStudentsData(url, instructorId) {
    try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.filter(student => student.instructorId === instructorId);
    } catch (error) {
        console.error('Error fetching students data:', error);
    }
}

export async function fetchStudentbyCourse(url, instructorId, courseName) {
    try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.filter(student => student.instructorId === instructorId && student.course === courseName);
    } catch (error) {
        console.error('Error fetching student data by course:', error);
    }
}