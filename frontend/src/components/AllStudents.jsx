import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8070/student');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch students');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:8070/student/delete/${id}`);
        setSuccess('Student deleted successfully');
        fetchStudents();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete student');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>All Students</h2>
        </div>
        <div className="card-body">
          {success && <div className="alert alert-success">{success}</div>}
          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td className="action-cell">
                    <Link
                      to={`/edit/${student._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;