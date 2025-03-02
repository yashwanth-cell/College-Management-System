import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const fetchData = async () => {
    try {
      const studentResponse = await axios.get('http://localhost:5000/students');
      const courseResponse = await axios.get('http://localhost:5000/courses');
      const facultyResponse = await axios.get('http://localhost:5000/faculty');
      setStudents(studentResponse.data);
      setCourses(courseResponse.data);
      setFaculty(facultyResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddStudent = async () => {
    const newStudent = {
      name: 'John Doe',
      rollNo: '12345',
      course: 'Computer Science',
      email: 'john@example.com',
      phone: '123-456-7890',
    };
    await axios.post('http://localhost:5000/students', newStudent);
    fetchData();
  };

  const handleAddCourse = async () => {
    const newCourse = {
      name: 'Data Structures',
      code: 'CS101',
      description: 'Introduction to Data Structures',
    };
    await axios.post('http://localhost:5000/courses', newCourse);
    fetchData();
  };

  const handleAddFaculty = async () => {
    const newFaculty = {
      name: 'Dr. Smith',
      employeeId: 'F001',
      department: 'Computer Science',
      email: 'smith@example.com',
    };
    await axios.post('http://localhost:5000/faculty', newFaculty);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>College Management System</h1>

      <button onClick={handleAddStudent}>Add Student</button>
      <button onClick={handleAddCourse}>Add Course</button>
      <button onClick={handleAddFaculty}>Add Faculty</button>

      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.name} - {student.rollNo}</li>
        ))}
      </ul>

      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.name} - {course.code}</li>
        ))}
      </ul>

      <h2>Faculty</h2>
      <ul>
        {faculty.map(facultyMember => (
          <li key={facultyMember._id}>{facultyMember.name} - {facultyMember.department}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
