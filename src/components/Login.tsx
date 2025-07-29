import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      alert('Login successful!');
      navigate('/dashboard'); // ✅ Redirect Dashboardile
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login')}</h2>
        <input
          className="border p-2 mb-4 w-full rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-6 w-full rounded"
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleLogin}
        >
          {t('login')}
        </button>
      </div>
    </div>
  );
}
