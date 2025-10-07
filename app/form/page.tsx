'use client';

import { useState } from 'react';

export default function FormPage() {
  const [message, setMessage] = useState('Привет, Timeweb!');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Ошибка запроса');
      setResponse(data?.message ?? 'OK');
    } catch (err: any) {
      setError(err?.message || 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Тестовая форма</h1>
      <form onSubmit={onSubmit} className="mt-3">
        <label>Сообщение</label>
        <input
          className="input mt-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите текст..."
        />
        <button className="btn mt-3" type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <b>Ответ API:</b>
          <pre className="mt-2">{response}</pre>
        </div>
      )}
      {error && (
        <div className="mt-4" style={{ color: '#ef4444' }}>
          <b>Ошибка:</b>
          <pre className="mt-2">{error}</pre>
        </div>
      )}
    </div>
  );
}
