        (() => {
            const dashboard = document.querySelector('#Dynmic .analytics-dashboard');
            if (!dashboard || dashboard.dataset.initialized === 'true') {
                return;
            }
            dashboard.dataset.initialized = 'true';

            if (typeof window.destroyDashboard === 'function') {
                window.destroyDashboard();
            }

            const charts = [];
            window.destroyDashboard = () => {
                charts.forEach((chart) => chart.destroy());
                charts.length = 0;
            };

            // Common Font standard
            Chart.defaults.font.family = "Arial, Helvetica, sans-serif";
            Chart.defaults.color = '#94a3b8';

            /* ==========================================
               1. PERFORMANCE OVER TIME CHART
            ========================================== */
            const perfCtx = document.getElementById('performanceChart').getContext('2d');
            
            const currentCohortData = [45, 52, 58, 50, 62, 68, 72, 78, 75, 88];
            const previousCohortData = [40, 48, 50, 55, 58, 60, 65, 70, 72, 80];

            let perfChart = new Chart(perfCtx, {
                type: 'bar',
                data: {
                    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                    datasets: [{
                        data: currentCohortData,
                        backgroundColor: (context) => {
                            // Highlight W10 (last bar) with darker orange
                            return context.dataIndex === 9 ? '#f97316' : '#ffb066';
                        },
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

            // Cohort Toggle Interactions
            const btnCurrent = document.getElementById('btnCurrentCohort');
            const btnPrevious = document.getElementById('btnPreviousCohort');

            btnCurrent.addEventListener('click', () => {
                btnCurrent.classList.add('is-active');
                btnCurrent.setAttribute('aria-pressed', 'true');
                btnPrevious.classList.remove('is-active');
                btnPrevious.setAttribute('aria-pressed', 'false');
                
                perfChart.data.datasets[0].data = currentCohortData;
                perfChart.update();
            });

            btnPrevious.addEventListener('click', () => {
                btnPrevious.classList.add('is-active');
                btnPrevious.setAttribute('aria-pressed', 'true');
                btnCurrent.classList.remove('is-active');
                btnCurrent.setAttribute('aria-pressed', 'false');
                
                perfChart.data.datasets[0].data = previousCohortData;
                perfChart.update();
            });


            /* ==========================================
               2. COURSE COMPLETION DONUT CHART
            ========================================== */
            const compCtx = document.getElementById('completionChart').getContext('2d');
            const completionChart = new Chart(compCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In progress', 'Not started'],
                    datasets: [{
                        data: [74, 18, 8],
                        backgroundColor: ['#ff6b00', '#3b82f6', '#e2e8f0'],
                        borderWidth: 0,
                        hoverOffset: 4
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
                                label: (context) => ` ${context.label}: ${context.parsed}%`
                            }
                        }
                    }
                }
            });


            /* ==========================================
               3. ATTENDANCE BY COURSE CHART
            ========================================== */
            const attCtx = document.getElementById('attendanceChart').getContext('2d');
            const attendanceChart = new Chart(attCtx, {
                type: 'bar',
                data: {
                    labels: ['Alg.', 'Phys.', 'Eng.', 'Bio.', 'Hist.', 'Chem.'],
                    datasets: [{
                        data: [90, 86, 82, 88, 76, 85],
                        backgroundColor: (context) => {
                            // Highlight Chem bar with darker blue
                            return context.dataIndex === 5 ? '#3b82f6' : '#93c5fd';
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
                                label: (context) => ` Attendance: ${context.parsed.y}%`
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

            charts.push(perfChart, completionChart, attendanceChart);
        })();