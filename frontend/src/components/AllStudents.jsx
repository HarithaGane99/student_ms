import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { jwtDecode } from 'jwt-decode'; 

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth(); // Get the token

  // Get user role from token
  const userRole = token ? jwtDecode(token).user.role : null;

  useEffect(() => {
    fetchStudents();
  }, [token]); // Re-fetch if token changes

  // Create a reusable axios instance with the auth header
  const authAxios = axios.create({
    baseURL: 'http://localhost:8070',
    headers: {
      'x-auth-token': `${token}`,
    },
  });

  const fetchStudents = async () => {
    try {
      // Use the new URL and the authorized axios instance
      const response = await authAxios.get('/api/student');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch students. You may not be authorized.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await authAxios.delete(`/api/student/delete/${id}`);
        setSuccess('Student deleted successfully');
        fetchStudents();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete student. Only admins can perform this action.');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header"><h2>All Students</h2></div>
        <div className="card-body">
          {success && <div className="alert alert-success">{success}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Age</th><th>Gender</th><th>Email</th>
                {userRole === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td><td>{student.age}</td>
                  <td>{student.gender}</td><td>{student.email}</td>
                  {/* Only show actions if the user is an admin */}
                  {userRole === 'admin' && (
                    <td className="action-cell">
                      <Link to={`/edit/${student._id}`} className="btn btn-primary btn-sm">Edit</Link>
                      <button onClick={() => handleDelete(student._id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  )}
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