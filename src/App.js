// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectStatusModule from './components/ProjectStatusModule';
//import PlaceholderModule from './components/PlaceholderModule';

function App() {
  const [activeModule, setActiveModule] = useState('Project Status');

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'Project Status':
      case 'Setup Alerts': // As per prompt, both load ProjectStatusModule
        return <ProjectStatusModule />;
      case 'Test Case Analysis':
        //return <PlaceholderModule title="Test Case Analysis" />;
      case 'Add New Test Cases':
        //return <PlaceholderModule title="Add New Test Cases" />;
      default:
        return <ProjectStatusModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setActiveModule={setActiveModule} activeModule={activeModule} />
      <div className="px-[100px] py-8"> {/* Page Layout Padding */}
        {renderModuleContent()}
      </div>
    </div>
  );
}

export default App;