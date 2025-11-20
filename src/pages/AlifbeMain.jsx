import React from 'react';
import Harf from './Harf';
import './AlifbeMain.css';

const AlifbeMain = ({ selectedSection }) => {
  // Faqat Alifbe bo'limi uchun Harf komponentini ko'rsatamiz
  const renderContent = () => {
    if (selectedSection === 'alifbe') {
      return <Harf />;
    }
    
    // Boshqa bo'limlar uchun placeholder
    return (
      <div className="subject-placeholder">
        <div className="placeholder-content">
          <div className="placeholder-icon">
            {getSubjectIcon(selectedSection)}
          </div>
          <h1>{selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</h1>
          <p>Ushbu bo'lim tez orada qo'shiladi</p>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span>Ishlab chiqilmoqda...</span>
          </div>
        </div>
      </div>
    );
  };

  // Fanlar uchun iconlar
  const getSubjectIcon = (subject) => {
    const icons = {
      'matematika': '🔢',
      'ona tili': '📖',
      'tarbiya': '⚽',
      'geografiya': '🌍',
      'informatika': '💻',
      'fizika': '⚛️',
      'kimyo': '🧪',
      'biologiya': '🔬',
      'tarix': '📜',
      'adabiyot': '📚'
    };
    return icons[subject] || '📚';
  };

  return (
    <div className="alifbe-main">
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AlifbeMain;
