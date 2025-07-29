import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadInvoice: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('vee_arve');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('m³');
  const [price, setPrice] = useState('');
  const [vat, setVat] = useState('24');
  const [readingValue, setReadingValue] = useState('');
  const [apartment, setApartment] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [apartments, setApartments] = useState<{ id: number; name: string }[]>(
    []
  );

  // ✅ Fetch korterid API-st
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/apartments')
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Korterite laadimine ebaõnnestus:', error);
      });
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert('Palun vali fail');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    if (category === 'veenäit') {
      formData.append('reading_value', readingValue);
      formData.append('apartment', apartment);
    } else {
      formData.append('invoice_date', invoiceDate);
      formData.append('invoice_number', invoiceNumber);
      formData.append('amount', amount.replace(',', '.'));
      formData.append('quantity', quantity.replace(',', '.'));
      formData.append('unit', unit);
      formData.append('price', price.replace(',', '.'));
      formData.append('vat', vat.replace(',', '.'));
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/invoices/upload-invoice',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setUploadStatus(`✅ Salvestatud: ${response.data.filename}`);
    } catch (error) {
      setUploadStatus('❌ Viga: Serveri viga');
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Faili üleslaadimine</h2>

      <label className="block mb-2">Kategooria:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      >
        <option value="vee_arve">Vee arve</option>
        <option value="prügi_arve">Prügi arve</option>
        <option value="veenäit">Veenäidud</option>
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="mb-4"
      />

      {category === 'veenäit' ? (
        <>
          <input
            type="text"
            placeholder="Veenäit"
            value={readingValue}
            onChange={(e) => setReadingValue(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />

          <select
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="">Vali korter</option>
            {apartments.map((apt) => (
              <option key={apt.id} value={apt.name}>
                {apt.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Arve kuupäev (nt 30.06.2025)"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Arve number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />

          {/* ✅ Summa koos € märgiga */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Summa"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded p-2 w-full pr-10"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">€</span>
          </div>

          {/* ✅ Kogus */}
          <input
            type="text"
            placeholder="Kogus"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />

          {/* ✅ Ühik dropdown */}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="m³">m³</option>
            <option value="tk">tk</option>
            <option value="t">t</option>
          </select>

          {/* ✅ Hind koos € märgiga */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Hind"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded p-2 w-full pr-10"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">€</span>
          </div>

          {/* ✅ Käibemaks koos % märgiga */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Käibemaks"
              value={vat}
              onChange={(e) => setVat(e.target.value)}
              className="border rounded p-2 w-full pr-10"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">% km</span>
          </div>
        </>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Lae üles
      </button>

      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default UploadInvoice;
