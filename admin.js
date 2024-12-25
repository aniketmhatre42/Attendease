document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const attendanceForm = document.getElementById('attendanceForm');
    const studentList = document.getElementById('studentList');
    const logoutButton = document.getElementById('logoutButton');

    let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

    // Add student
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value.trim();
        if (studentName) {
            addStudent(studentName);
            document.getElementById('studentName').value = '';
        }
    });

    // Mark attendance
    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        markAttendance();
    });

    // Logout button
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    function addStudent(studentName) {
        if (!attendanceData.some(record => record.name === studentName)) {
            attendanceData.push({ name: studentName });
            localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
            renderStudentList();
        }
    }

    function markAttendance() {
        const checkboxes = document.querySelectorAll('#studentList input[type="checkbox"]');
        const date = new Date().toLocaleDateString();
        checkboxes.forEach(checkbox => {
            const studentName = checkbox.value;
            const student = attendanceData.find(record => record.name === studentName);
            if (student) {
                student[date] = checkbox.checked ? 'present' : 'absent';
            }
        });
        localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    }

    function renderStudentList() {
        studentList.innerHTML = '';
        attendanceData.forEach(record => {
            const div = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = record.name;
            label.textContent = record.name;
            div.appendChild(input);
            div.appendChild(label);
            studentList.appendChild(div);
        });
    }

    window.exportCSV = function () {
        const csvData = [];
        const dates = new Set();

        attendanceData.forEach(record => {
            Object.keys(record).forEach(key => {
                if (key !== 'name') dates.add(key);
            });
        });

        const header = ['Name', ...Array.from(dates)];
        csvData.push(header);

        attendanceData.forEach(record => {
            const row = [record.name];
            dates.forEach(date => {
                row.push(record[date] || 'absent');
            });
            csvData.push(row);
        });

        const csvContent = "data:text/csv;charset=utf-8,"
            + csvData.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "attendanceData.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    renderStudentList();
});