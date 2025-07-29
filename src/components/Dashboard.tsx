import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [category, setCategory] = useState('vee_arve');
  const [file, setFile] = useState<File | null>(null);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('m³');
  const [price, setPrice] = useState('');
  const [vat, setVat] = useState('24');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Palun vali fail!');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('invoice_date', invoiceDate);
    formData.append('invoice_number', invoiceNumber);
    formData.append('amount', amount.replace(',', '.'));
    formData.append('quantity', quantity.replace(',', '.'));
    formData.append('unit', unit);
    formData.append('price', price.replace(',', '.'));
    formData.append('vat', vat);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5001/invoices/upload-invoice', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(`Salvestatud: ${data.filename}`);
      } else {
        alert(data.error || 'Viga salvestamisel');
      }
    } catch (error) {
      alert('Serveri viga!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Faili üleslaadimine</h2>
      <div className="space-y-4">
        {/* Kategooria */}
        <div>
          <label className="block font-semibold mb-1">Kategooria:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="vee_arve">Vee arve</option>
            <option value="prügi_arve">Prügi arve</option>
            <option value="veenäit">Veenäit</option>
          </select>
        </div>

        {/* Fail */}
        <div>
          <label className="block font-semibold mb-1">Fail:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Arvevorm ainult vee/prügi puhul */}
        {category !== 'veenäit' && (
          <>
            <input
              type="text"
              placeholder="Arve kuupäev (nt 30.06.2025)"
              className="w-full border rounded px-3 py-2"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Arve number"
              className="w-full border rounded px-3 py-2"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Summa"
                className="w-full border rounded px-3 py-2 pr-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="absolute right-3 top-2 text-gray-500">€</span>
            </div>
            <input
              type="text"
              placeholder="Kogus"
              className="w-full border rounded px-3 py-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <select
              className="w-full border rounded px-3 py-2"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="m³">m³</option>
              <option value="tk">tk</option>
              <option value="t">t</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Hind"
                className="w-full border rounded px-3 py-2 pr-8"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="absolute right-3 top-2 text-gray-500">€</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Käibemaks"
                className="w-full border rounded px-3 py-2 pr-10"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
              />
              <span className="absolute right-3 top-2 text-gray-500">% km</span>
            </div>
          </>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Laeb...' : 'Lae üles'}
        </button>

        {success && <p className="text-green-600 mt-2">✅ {success}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
