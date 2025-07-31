import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../useAuth';

interface Apartment {
  id: number;
  name: string;
}

export default function UploadInvoice() {
  const [file, setFile] = useState<File | null>(null);
  const [reading, setReading] = useState('');
  const [date, setDate] = useState('');
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [selectedApartment, setSelectedApartment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

  useEffect(() => {
    api
      .get('/apartments')
      .then((res) => setApartments(res.data))
      .catch(() => setError('Korterite laadimine ebaõnnestus'));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const ext = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!ext || !allowedExtensions.includes(ext)) {
        setError('Faili tüüp pole lubatud (PDF, JPG, JPEG, PNG)');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const { getToken } = useAuth();

  const handleUpload = async () => {
    if (!file || !reading || !date || !selectedApartment) {
      setError('Kõik väljad on kohustuslikud!');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('reading', reading);
    formData.append('apartment_id', selectedApartment);

    const formattedDate = new Date(date).toISOString().split('T')[0];
    formData.append('date', formattedDate);

    try {
      await api.post('/upload-reading', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Veenäit edukalt üles laetud!');
      setReading('');
      setDate('');
      setSelectedApartment('');
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Üleslaadimine ebaõnnestus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl mb-4">Lisa veenäidu pilt</h2>

      <div className="mb-3">
        <label className="block mb-1">Korter:</label>
        <select
          value={selectedApartment}
          onChange={(e) => setSelectedApartment(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Vali korter</option>
          {apartments.map((apt) => (
            <option key={apt.id} value={apt.id}>
              {apt.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Kuupäev:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Näit (m³):</label>
        <input
          type="number"
          value={reading}
          onChange={(e) => setReading(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Fail:</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {message && <div className="text-green-500 mb-2">{message}</div>}

      <button
        onClick={(e) => {
          e.preventDefault();
          handleUpload();
        }}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Laen üles...' : 'Lae üles'}
      </button>
    </div>
  );
}
