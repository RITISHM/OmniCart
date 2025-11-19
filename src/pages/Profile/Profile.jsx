import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, authAPI } from '../../services/api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const token = localStorage.getItem('token');
      
      if (!isLoggedIn || !token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        // Load user data from MongoDB
        const data = await userAPI.getProfile();
        console.log('✅ Profile loaded from MongoDB:', data);
        
        setUserData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || ''
        });
      } catch (error) {
        console.error('❌ Error loading profile:', error);
        // If token is invalid, redirect to login
        if (error.message === 'Not authorized, token failed') {
          localStorage.clear();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      // Save to MongoDB
      const updated = await userAPI.updateProfile(userData);
      console.log('✅ Profile updated in MongoDB:', updated);
      
      setUserData({
        name: updated.name || '',
        email: updated.email || '',
        phone: updated.phone || '',
        address: updated.address || '',
        city: updated.city || '',
        country: updated.country || ''
      });
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-wrapper">
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-wrapper">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-email">{userData.email}</p>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <div className="section-header">
                <h2>Personal Information</h2>
                {!isEditing ? (
                  <button 
                    className="btn-edit" 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    className="btn-cancel" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter country"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={userData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="profile-section">
              <h2>Account Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Order History</h3>
                    <p>View your past orders and track current ones</p>
                  </div>
                  <button className="btn-link">View Orders</button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Change Password</h3>
                    <p>Update your password to keep your account secure</p>
                  </div>
                  <button className="btn-link">Change</button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Notifications</h3>
                    <p>Manage your email and push notifications</p>
                  </div>
                  <button className="btn-link">Manage</button>
                </div>
              </div>
            </div>

            <div className="profile-section danger-zone">
              <h2>Danger Zone</h2>
              <div className="danger-actions">
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
                <button className="btn btn-delete">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
