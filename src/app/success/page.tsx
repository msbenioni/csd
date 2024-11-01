"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const [status, setStatus] = useState('loading');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.paid) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        })
        .catch(() => setStatus('error'));
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {status === 'loading' && <p>Verifying payment...</p>}
        {status === 'success' && (
          <>
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p>Thank you for your booking. You will receive a confirmation email shortly.</p>
          </>
        )}
        {status === 'error' && (
          <p className="text-red-600">There was an error processing your payment.</p>
        )}
      </div>
    </div>
  );
} 