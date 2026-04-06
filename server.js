const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());

// Routes
app.use('/students', studentRoutes);

// Home route (optional)
app.get('/', (req, res) => {
    res.send('Student API is running 🚀');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📌 GET all students: http://localhost:${PORT}/students`);
});