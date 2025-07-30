import React from 'react';
import UploadInvoice from './components/UploadInvoice';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Arved ja Naabrid</h1>
      <UploadInvoice />
    </div>
  );
};

export default App;
