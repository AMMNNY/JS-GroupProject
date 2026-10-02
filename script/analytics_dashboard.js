import { fetchStudentsData } from '../module/studentAPI.js';
import { fetchCoursesData } from '../module/courseAPI.js';
import { getInstructorById } from '../module/instructorAPI.js';

let studentsData = fetchStudentsData('http://localhost:3000/students', 'I001');
let coursesData = fetchCoursesData('http://localhost:3000/courses');

let totalStudentsElement = document.getElementById('totalStudents');
studentsData.then(data => {
    if (data) {
        totalStudentsElement.textContent = data.length;
    } else {
        totalStudentsElement.textContent = 'N/A';
    }
});

let attendanceRateElement = document.getElementById('attendanceRate');
// Assuming you have a function to fetch attendance data
studentsData.then(data => {
    if (data) {
        let totalAttendance = 0;
        for (let student of data) {
            totalAttendance += student.attendance; // Assuming each student object has an attendanceRate property
        }
        attendanceRateElement.textContent = `${(totalAttendance / data.length).toFixed(1)}%`;
    } else {
        attendanceRateElement.textContent = 'N/A';
    }
});

let instructorNameElement = document.getElementById('instructorName');
let instructorData = getInstructorById('I001');
instructorData.then(data => {
    if (data) {
        instructorNameElement.textContent = data.name;
    }
});

let avatarElement = document.querySelector('.avatar');
instructorData.then(data => {
    if (data) {
        avatarElement.textContent = data.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('');
    }
});


function initDashboard() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js failed to load.');
        return;
    }

    const performanceCanvas = document.getElementById('performanceChart');
    const completionCanvas = document.getElementById('completionChart');
    const attendanceCanvas = document.getElementById('attendanceChart');

    if (!performanceCanvas || !completionCanvas || !attendanceCanvas) {
        console.warn('Dashboard chart canvases not found yet.');
        return;
    }

    // Common Font standard
    Chart.defaults.font.family = "Arial, Helvetica, sans-serif";
    Chart.defaults.color = '#94a3b8';

    /* ==========================================
       1. PERFORMANCE OVER TIME CHART
    ========================================== */
    const perfCtx = performanceCanvas.getContext('2d');

    studentsData.then(data => {
        if (!Array.isArray(data) || data.length === 0) return;

        const studentsAvgGrades = data.map(student => {
            const grades = Object.values(student.grades || {});
            return grades.length ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length : 0;
        });

        new Chart(perfCtx, {
            type: 'bar',
            data: {
                labels: data.map(student => student.name),
                datasets: [{
                    data: studentsAvgGrades,
                    backgroundColor: '#ffb066',
                    borderRadius: {
                        topLeft: 6,
                        topRight: 6,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false,
                    barThickness: 22
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` Score: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: { font: { size: 11 } }
                    },
                    y: {
                        display: false,
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    });

    /* ==========================================
       2. COURSE COMPLETION DONUT CHART
    ========================================== */
    Promise.all([coursesData, studentsData]).then(([courses, students]) => {
        if (!Array.isArray(courses) || !Array.isArray(students)) return;

        const courseColors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#e0f2fe'];
        const courseCounts = courses.map(course => ({
            name: course.name,
            count: students.filter(student => student.course === course.name).length
        }));
        const compCtx = completionCanvas.getContext('2d');

        new Chart(compCtx, {
            type: 'doughnut',
            data: {
                labels: courseCounts.map(course => course.name),
                datasets: [{
                    data: courseCounts.map(course => course.count),
                    backgroundColor: courseCounts.map((_, index) => courseColors[index % courseColors.length]),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '78%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` ${context.label}: ${context.parsed} students`
                        }
                    }
                }
            }
        });

        const donutLabel = document.querySelector('.donut-label span');
        if (donutLabel) {
            donutLabel.textContent = students.length;
        }

        const legend = document.querySelector('.completion-legend');
        if (legend) {
            const legendRows = courseCounts.map((course, index) => {
                const row = document.createElement('div');
                row.className = 'legend-row';

                const name = document.createElement('div');
                name.className = 'legend-name';

                const swatch = document.createElement('span');
                swatch.className = 'legend-swatch';
                swatch.style.backgroundColor = courseColors[index % courseColors.length];

                const courseName = document.createElement('span');
                courseName.textContent = course.name;
                name.append(swatch, courseName);

                const count = document.createElement('span');
                count.className = 'legend-value';
                count.textContent = course.count;
                row.append(name, count);
                return row;
            });
            legend.replaceChildren(...legendRows);
        }
    });

    /* ==========================================
       3. ATTENDANCE BY COURSE CHART
    ========================================== */
    const attCtx = attendanceCanvas.getContext('2d');
    Promise.all([coursesData, studentsData]).then(([courses, students]) => {
        if (!Array.isArray(courses) || !Array.isArray(students)) return;

        const courseAttendance = courses.map(course => {
            const courseStudents = students.filter(student => student.course === course.name);
            const totalAttendance = courseStudents.reduce((sum, student) => sum + student.attendance, 0);

            return courseStudents.length ? totalAttendance / courseStudents.length : 0;
        });

        new Chart(attCtx, {
            type: 'bar',
            data: {
                labels: courses.map(course => course.name),
                datasets: [{
                    data: courseAttendance,
                    backgroundColor: (context) => {
                        return context.dataIndex === courseAttendance.length - 1 ? '#3b82f6' : '#93c5fd';
                    },
                    borderRadius: {
                        topLeft: 6,
                        topRight: 6,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false,
                    barThickness: 28
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` Attendance: ${context.parsed.y.toFixed(1)}%`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: { font: { size: 11, weight: '500' } }
                    },
                    y: {
                        display: false,
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard, { once: true });
} else {
    initDashboard();
}