import React, { useEffect, useState } from 'react';

const UploadedFiles = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/invoices/list')
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (id: number) => {
    window.open(`http://localhost:5001/invoices/download/${id}`, '_blank');
  };

  if (loading) return <p>Laeb...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Üleslaaditud failid</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Fail</th>
            <th className="p-2">Kategooria</th>
            <th className="p-2">Kuupäev</th>
            <th className="p-2">Laadi alla</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-t">
              <td className="p-2">{file.file_name}</td>
              <td className="p-2">{file.category}</td>
              <td className="p-2">{file.upload_date || '-'}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDownload(file.id)}
                  className="text-blue-600 underline"
                >
                  Lae alla
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedFiles;
