import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const API_URL = "http://localhost:3000/students"; // Adjust to your backend URL

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ id: null, firstName: "", lastName: "", email: "" });
  const [editing, setEditing] = useState(false);

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(API_URL)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new student
  const handleAddStudent = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return alert("All fields are required!");

    axios.post(API_URL, formData)
      .then(() => {
        fetchStudents();
        setFormData({ id: null, firstName: "", lastName: "", email: "" });
      })
      .catch(error => console.error("Error adding student:", error));
  };

  // Edit student
  const handleEditStudent = (student) => {
    setFormData(student);
    setEditing(true);
  };

  // Update student
  const handleUpdateStudent = () => {
    axios.put(`${API_URL}/${formData.id}`, formData)
      .then(() => {
        fetchStudents();
        setFormData({ id: null, firstName: "", lastName: "", email: "" });
        setEditing(false);
      })
      .catch(error => console.error("Error updating student:", error));
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => fetchStudents())
        .catch(error => console.error("Error deleting student:", error));
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {/* Add/Edit Student Form */}
      <div className="form-container">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} />

        {editing ? (
          <button className="submit edit" onClick={handleUpdateStudent}>Update Student</button>
        ) : (
          <button className="submit" onClick={handleAddStudent}>Add Student</button>
        )}
      </div>

      {/* Students Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.enrollmentDate}</td>

                <td>
                  <button className="edit" onClick={() => handleEditStudent(student)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
