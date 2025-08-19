import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // Get the token
  // ... rest of your state declarations ...
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create the authorized axios instance
  const authAxios = axios.create({
      baseURL: 'http://localhost:8070',
      headers: {
        'x-auth-token': `${token}`,
      },
    });


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await authAxios.get(`/api/student/get/${id}`);
        const student = response.data.user;
        setFormData({ name: student.name, age: student.age, gender: student.gender, email: student.email });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
      }
    };
    if (token) {
      fetchStudent();
    }
  }, [id, token]);

  const handleChange = (e) => { /* ... no change here ... */ };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Use the new URL and authorized instance
      await authAxios.put(`/api/student/update/${id}`, {
        ...formData,
        age: Number(formData.age)
      });
      setSuccess('Student updated successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating student');
    }
  };

  // ... rest of your JSX remains the same
return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Edit Student</h2>
        </div>
        <div className="card-body">
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mt-4">
              <button type="submit" className="btn btn-primary me-2">
                Update Student
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;