import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Load user data from localStorage
    const storedName = localStorage.getItem('userName') || 'User';
    const storedEmail = localStorage.getItem('userEmail') || '';
    
    setUserData({
      name: storedName,
      email: storedEmail,
      phone: localStorage.getItem('userPhone') || '',
      address: localStorage.getItem('userAddress') || '',
      city: localStorage.getItem('userCity') || '',
      country: localStorage.getItem('userCountry') || ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userPhone', userData.phone);
    localStorage.setItem('userAddress', userData.address);
    localStorage.setItem('userCity', userData.city);
    localStorage.setItem('userCountry', userData.country);
    
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

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
                    <button type="submit" className="btn btn-primary">
                      Save Changes
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
