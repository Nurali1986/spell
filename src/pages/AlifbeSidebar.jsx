import React from 'react';
import './AlifbeSidebar.css';

const AlifbeSidebar = ({ selectedSection, onSectionSelect }) => {
  const sections = [
    "Alifbe", "Matematika", "Ona tili", "Tarbiya", 
    "Geografiya", "Informatika", "Fizika", "Kimyo",
    "Biologiya", "Tarix", "Adabiyot"
  ];

  
  return (
    <div className="alifbe-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="section-title">O'quv bo'limlari</h2>
      </div>

      {/* Sections Grid */}
      <div className="sections-grid">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`section-btn ${selectedSection === section.toLowerCase() ? 'active' : ''}`}
            onClick={() => onSectionSelect(section.toLowerCase())}
          >
            <span className="section-icon">
              {section.charAt(0)}
            </span>
            <span className="section-name">{section}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlifbeSidebar;
