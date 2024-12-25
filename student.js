document.addEventListener('DOMContentLoaded', () => {
    const attendanceRecords = document.getElementById('attendanceRecords');
    const logoutButton = document.getElementById('logoutButton');
    const username = localStorage.getItem('username');
    const attendanceChart = document.getElementById('attendanceChart').getContext('2d');
    let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

    // Logout button
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    function renderAttendanceRecords() {
        attendanceRecords.innerHTML = '';
        const student = attendanceData.find(record => record.name === username);
        if (student) {
            Object.keys(student).forEach(date => {
                if (date !== 'name') {
                    const li = document.createElement('li');
                    li.textContent = `${date}: ${student[date]}`;
                    attendanceRecords.appendChild(li);
                }
            });
        }
    }

    function renderAttendanceChart() {
        const student = attendanceData.find(record => record.name === username);
        if (student) {
            const attendanceCounts = {
                present: 0,
                absent: 0
            };

            Object.keys(student).forEach(date => {
                if (date !== 'name') {
                    attendanceCounts[student[date]]++;
                }
            });

            new Chart(attendanceChart, {
                type: 'pie',
                data: {
                    labels: ['Present', 'Absent'],
                    datasets: [{
                        data: [attendanceCounts.present, attendanceCounts.absent],
                        backgroundColor: ['#4CAF50', '#F44336']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // Initial render
    renderAttendanceRecords();
    renderAttendanceChart();
});