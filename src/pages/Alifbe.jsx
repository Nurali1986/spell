import React, { useState } from 'react';
import AlifbeSidebar from './AlifbeSidebar';
import AlifbeMain from './AlifbeMain';
import './Alifbe.css';

const Alifbe = () => {
  const [selectedSection, setSelectedSection] = useState('alifbe');

  return (
    <div className="alifbe-container">
  <AlifbeSidebar
    selectedSection={selectedSection}
    onSectionSelect={setSelectedSection}
  />
  
  <div className="alifbe-main-wrapper">
    <AlifbeMain selectedSection={selectedSection} />
  </div>
</div>

  );
};

export default Alifbe;
