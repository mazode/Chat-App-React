import { useState } from 'react'
import './detail.css'

const Detail = () => {
  const [expandedSections, setExpandedSections] = useState({
    chatSettings: false,
    privacy: false,
    sharedPhotos: true,
    sharedFiles: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  const handleBlockUser = () => {
    // Add block user logic here
    console.log('Blocking user...');
  };

  return (
    <div className='detail'>
      <div className="user">
        <img src="./dp.jpg" alt="Profile" />
        <h2>Mazode</h2>
        <p>Hey there, I am using Chatty</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title" onClick={() => toggleSection('chatSettings')}>
            <span>Chat Settings</span>
            <img 
              src={expandedSections.chatSettings ? "./arrowDown.png" : "./arrowUp.png"} 
              alt="Toggle" 
              style={{ transform: expandedSections.chatSettings ? 'rotate(180deg)' : 'none' }}
            />
          </div>
          {expandedSections.chatSettings && (
            <div className="content">
              {/* Add chat settings content here */}
            </div>
          )}
        </div>
        <div className="option">
          <div className="title" onClick={() => toggleSection('privacy')}>
            <span>Privacy & Help</span>
            <img 
              src={expandedSections.privacy ? "./arrowDown.png" : "./arrowUp.png"} 
              alt="Toggle"
              style={{ transform: expandedSections.privacy ? 'rotate(180deg)' : 'none' }}
            />
          </div>
          {expandedSections.privacy && (
            <div className="content">
              {/* Add privacy content here */}
            </div>
          )}
        </div>
        <div className="option">
          <div className="title" onClick={() => toggleSection('sharedPhotos')}>
            <span>Shared Photos</span>
            <img 
              src={expandedSections.sharedPhotos ? "./arrowDown.png" : "./arrowUp.png"} 
              alt="Toggle"
              style={{ transform: expandedSections.sharedPhotos ? 'rotate(180deg)' : 'none' }}
            />
          </div>
          {expandedSections.sharedPhotos && (
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://images.unsplash.com/photo-1747633126452-dee49902fc6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shared photo" />
                  <span>photo.png</span>
                </div>
                <img src="./download.png" alt="Download" className='icon' onClick={() => console.log('Downloading photo...')}/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://images.unsplash.com/photo-1747633126452-dee49902fc6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shared photo" />
                  <span>photo.png</span>
                </div>
                <img src="./download.png" alt="Download" className='icon' onClick={() => console.log('Downloading photo...')}/>
              </div>
            </div>
          )}
        </div>
        <div className="option">
          <div className="title" onClick={() => toggleSection('sharedFiles')}>
            <span>Shared Files</span>
            <img 
              src={expandedSections.sharedFiles ? "./arrowDown.png" : "./arrowUp.png"} 
              alt="Toggle"
              style={{ transform: expandedSections.sharedFiles ? 'rotate(180deg)' : 'none' }}
            />
          </div>
          {expandedSections.sharedFiles && (
            <div className="content">
              {/* Add shared files content here */}
            </div>
          )}
        </div>
        <button onClick={handleBlockUser}>Block User</button>
        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Detail