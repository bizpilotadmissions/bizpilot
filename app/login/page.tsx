'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Pass123!') { // Set your demo password here
      document.cookie = "demo_access=authenticated; path=/; max-age=86400";
      router.push('/');
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Enter Access Code</h2>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '8px', fontSize: '16px' }}
        />
        {error && <p style={{ color: 'red', margin: 0 }}>Incorrect password</p>}
        <button type="submit" style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>Unlock</button>
      </form>
    </div>
  );
}