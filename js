const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/college-management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schema Definitions

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  course: String,
  email: String,
  phone: String
});

const Student = mongoose.model('Student', studentSchema);

// Course Schema
const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String
});

const Course = mongoose.model('Course', courseSchema);

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  department: String,
  email: String
});

const Faculty = mongoose.model('Faculty', facultySchema);

// Routes

// Students Routes
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching students' });
  }
});

app.post('/students', async (req, res) => {
  const { name, rollNo, course, email, phone } = req.body;
  const newStudent = new Student({ name, rollNo, course, email, phone });
  
  try {
    await newStudent.save();
    res.json({ message: 'Student added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding student' });
  }
});

// Courses Routes
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching courses' });
  }
});

app.post('/courses', async (req, res) => {
  const { name, code, description } = req.body;
  const newCourse = new Course({ name, code, description });
  
  try {
    await newCourse.save();
    res.json({ message: 'Course added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding course' });
  }
});

// Faculty Routes
app.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching faculty' });
  }
});

app.post('/faculty', async (req, res) => {
  const { name, employeeId, department, email } = req.body;
  const newFaculty = new Faculty({ name, employeeId, department, email });
  
  try {
    await newFaculty.save();
    res.json({ message: 'Faculty added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding faculty' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
