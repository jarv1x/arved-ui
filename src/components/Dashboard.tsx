import React, { useState } from 'react';
import UploadInvoice from './UploadInvoice';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Arved ja Naabrid</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logi välja
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex space-x-4 border-b pb-2 mb-4">
          <button
            className={`${
              activeTab === 'upload' ? 'font-bold text-blue-500' : ''
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Lisa veenäidu pilt
          </button>
          <button
            className={`${
              activeTab === 'files' ? 'font-bold text-blue-500' : ''
            }`}
            onClick={() => setActiveTab('files')}
          >
            Failide nimekiri
          </button>
        </div>

        {activeTab === 'upload' && <UploadInvoice />}
        {activeTab === 'files' && <div>Tuleb peagi! (Failide tabel)</div>}
      </div>
    </div>
  );
};

export default Dashboard;
