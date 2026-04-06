const fs = require('fs');

const filePath = './data/students.json';

// Read students
function getStudents() {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data || '[]');
    } catch {
        return [];
    }
}

// Save students
function saveStudents(students) {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
}

module.exports = {
    getStudents,
    saveStudents
};