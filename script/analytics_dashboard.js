import { fetchStudentsData } from '../module/studentAPI.js';
import { fetchCoursesData } from '../module/courseAPI.js';

import { getActiveUser } from '../script/auth.js';

export function initDashboard() {
    let currentInstructor = getActiveUser();

    let studentsData = fetchStudentsData('http://localhost:3000/students', currentInstructor.id);
    let coursesData = fetchCoursesData('http://localhost:3000/courses');

    let totalStudentsElement = document.getElementById('totalStudents');
    studentsData.then(data => {
        if (data) {
            totalStudentsElement.textContent = data.length;
        } else {
            totalStudentsElement.textContent = '0';
        }
    });

    let totalCoursesElement = document.getElementById('totalCourses');
    coursesData.then(data => {
        if (data) {
            totalCoursesElement.textContent = data.length;
        } else {
            totalCoursesElement.textContent = '0';
        }
    });

    let attendanceRateElement = document.getElementById('attendanceRate');


    studentsData.then(data => {
        if (data) {
            let totalAttendance = 0;
            for (let student of data) {
                totalAttendance += parseInt(student.attendance) || 0;
            }
            console.log('Total Attendance:', totalAttendance);
            console.log('Number of Students:', data.length);
            attendanceRateElement.textContent = `${(totalAttendance / data.length).toFixed(1)}%`;
        } else {
            attendanceRateElement.textContent = '0%';
        }
    });

    let instructorNameElement = document.getElementById('instructorName');

    instructorNameElement.textContent = currentInstructor.name;    

    let avatarElement = document.querySelector('.avatar');
    avatarElement.textContent = currentInstructor.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('');


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

            const top5Students = data
                .map(student => {
                    const grades = Object.values(student.grades || {});

                    const average = grades.length
                        ? grades.reduce((sum, grade) => sum + parseFloat(grade), 0) / grades.length
                        : 0;

                    return {
                        name: student.name,
                        average: average
                    };
                })
                .sort((a, b) => b.average - a.average)
                .slice(0, 5);

            new Chart(perfCtx, {
                type: 'bar',
                data: {
                    labels: top5Students.map(student => student.name),
                    datasets: [{
                        data: top5Students.map(student => student.average),
                        backgroundColor: '#ffb066',
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
                    cutout: '60%',
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
                const totalAttendance = courseStudents.reduce((sum, student) => sum + parseInt(student.attendance) || 0, 0);

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
                        borderSkipped: false,
                        barThickness: 30
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

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', function () {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            themeToggle.setAttribute('aria-pressed', String(isDarkMode));

            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun', isDarkMode);
                themeIcon.classList.toggle('fa-moon', !isDarkMode);
            }
        });
    }

}