const { v4: uuidv4 } = require('uuid');
const { getStudents, saveStudents } = require('../models/studentModel');

// GET all students
exports.getAllStudents = (req, res) => {
    const students = getStudents();
    res.json(students);
};

// GET student by ID
exports.getStudentById = (req, res) => {
    const students = getStudents();
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
};

// POST create student
exports.createStudent = (req, res) => {
    const { name, branch, year } = req.body;

    if (!name || !branch || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const students = getStudents();

    const newStudent = {
        id: uuidv4(),
        name,
        branch,
        year
    };

    students.push(newStudent);
    saveStudents(students);

    res.status(201).json(newStudent);
};

// PATCH update student
exports.updateStudent = (req, res) => {
    const students = getStudents();
    const index = students.findIndex(s => s.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const updatedStudent = {
        ...students[index],
        ...req.body
    };

    students[index] = updatedStudent;
    saveStudents(students);

    res.json(updatedStudent);
};

// DELETE student
exports.deleteStudent = (req, res) => {
    const students = getStudents();
    const filtered = students.filter(s => s.id !== req.params.id);

    if (students.length === filtered.length) {
        return res.status(404).json({ message: 'Student not found' });
    }

    saveStudents(filtered);

    res.json({ message: 'Student deleted successfully' });
};