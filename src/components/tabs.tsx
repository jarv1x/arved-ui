import React, { useState } from 'react';
import Dashboard from './Dashboard';
import UploadedFiles from './UploadedFiles';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Üleslaadimine
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === 'files'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Failid
        </button>
      </div>
      {activeTab === 'upload' && <Dashboard />}
      {activeTab === 'files' && <UploadedFiles />}
    </div>
  );
};

export default Tabs;
