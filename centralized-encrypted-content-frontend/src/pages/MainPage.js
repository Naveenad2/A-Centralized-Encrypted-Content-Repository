
import React, { useState } from 'react';
import './css/MainPage.css'; // Import your CSS styles for this component
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { useNavigate } from 'react-router-dom';
import ContentDetailsModal from './ContentDetailsModal'; 

const MainPage = () => {

  const navigate = useNavigate();
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [selectedContentItem, setSelectedContentItem] = useState(null); // New state to track selected content item

  const handleContentItemClick = (contentItem) => {
    setSelectedContentItem(contentItem);
  };
  const [contentItems, setContentItems] = useState([
    // Sample content items, replace with your actual data
    {
      id: 1,
      title: 'Medical PDF Document',
      type: 'pdf',
      encrypted: true,
      // other properties...
    },
    {
      id: 2,
      title: '+ add a photo',
      type: 'image',
      encrypted: true,
      // other properties...
    },
    // ... more content items
  ]);

  const handleLogout = () => {

    document.cookie = 'userId=; Max-Age=0; Path=/';
    
    // Set Max-Age to 0 to expire immediately
    // Perform your logout logic here
   
    setShowLogoutModal(false);

    navigate('/');
  };

  const handleContentFilterChange = (contentType) => {
    setSelectedContentType(contentType);
  };

  const filteredContentItems = selectedContentType === 'all'
    ? contentItems
    : contentItems.filter(item => item.type === selectedContentType);

  return (
    <div className="main-page">
     
      <header>
        <div className="navbar">
          <div className="logo">Content Repository</div>
          <ul className="nav-links">
            <li><a href="#" className="nav-link">Home</a></li>
           
            <button className="button-logout" onClick={() => setShowLogoutModal(true)}>Logout</button>
          </ul>
        </div>
     
      </header>

      <main className="content-section">
        <div className="content-filters">
          <button
            className={selectedContentType === 'all' ? 'active' : ''}
            onClick={() => handleContentFilterChange('all')}
          >
            All
          </button>
          <button
            className={selectedContentType === 'pdf' ? 'active' : ''}
            onClick={() => handleContentFilterChange('pdf')}
          >
            PDFs
          </button>
          <button
            className={selectedContentType === 'image' ? 'active' : ''}
            onClick={() => handleContentFilterChange('image')}
          >
            Images
          </button>
          {/* Add more content types as needed */}
        </div>





       
    



        <div className="content-grid">

        {filteredContentItems.map((contentItem) => (
            <div
              key={contentItem.id}
              className="content-item"
              onClick={() => handleContentItemClick(contentItem)} // Handle content item click
            >
              <h3>{contentItem.title}</h3>
              <p>Type: {contentItem.type}</p>
              {contentItem.encrypted && <p>Encrypted</p>}
            </div>
          ))}
        </div>
      </main>

      {selectedContentItem && ( // Conditionally render modal when content item is selected
        <div className="blur-background">
          <div className="modal-container">
            <ContentDetailsModal
              contentItem={selectedContentItem}
              onClose={() => setSelectedContentItem(null)} // Close the modal
            />
          </div>
        </div>
      )}

       {showLogoutModal && (
        <div className="blur-background">
          <div className="modal-container">
            <LogoutConfirmationModal
              show={showLogoutModal}
              onClose={() => setShowLogoutModal(false)}
              onConfirm={handleLogout}
            />
          </div>
        </div>
      )}

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default MainPage;
