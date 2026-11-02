'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '../lib/analytics';
import { Loader2, AlertCircle } from 'lucide-react';

export default function PaginaPagamento() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPix, setLoadingPix] = useState(true);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(async (r) => {
        if (!r.ok) {
          router.replace('/login?next=/pagamento');
          return;
        }
        const data = await r.json();
        if (!data.email) {
          router.replace('/login?next=/pagamento');
          return;
        }
        if (data.status === 'active') {
          router.replace('/gerador');
          return;
        }
        setEmail(data.email);
        fetchPix();
      })
      .catch(() => router.replace('/login?next=/pagamento'));
  }, [router]);

  const fetchPix = async () => {
    setLoadingPix(true);
    try {
      const res = await fetch('/api/pagamento/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.qr_code_base64) {
        setQrCode(data.qr_code_base64);
      } else {
        setError('Falha ao gerar Pix. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao conectar ao serviço de pagamento.');
    } finally {
      setLoadingPix(false);
    }
  };

  useEffect(() => {
    fetchPix();
  }, [email]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#05080C]'>
        <Loader2 size={40} className='animate-spin text-emerald-400' />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-6 sm:py-10 bg-[#05080C]'>
      <div className='w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl p-5 sm:p-7 text-center'>
        <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
          <Loader2 size={14} className='animate-spin' /> Gerando seu Pix...
        </div>

        <h1 className='text-2xl font-bold mb-1 text-white'>
          Pagar acesso — R$ {137}
        </h1>

        {loadingPix && !qrCode ? (
          <p className='text-sm mb-4 text-white/60'>Gerando seu Pix...</p>
        ) : (
          qrCode ? (
            <div className='mb-6'>
              <img
                src={'data:image/jpeg;base64,' + qrCode}
                alt='QR Code Pix'
                className='w-64 h-64 mx-auto rounded-xl'
              />
              <p className='text-xs text-white/60 mt-2'>Aproxime o celular para ler o QR Code</p>
            </div>
          ) : (
            <div>
              {error && (
                <div className='mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border text-left bg-red-500/10 border-red-500/20 text-red-400'>
                  <AlertCircle size={16} className='shrink-0 mt-0.5' />
                  <span>{error}</span>
                </div>
              )}
              <p className='text-sm text-white/60'>Aguardando confirmação de pagamento...</p>
            </div>
          )
        )}

        <p className='text-sm mb-4 text-white/60'>{email}</p>

        <button
          type='button'
          onClick={() => router.push('/')}
          className='mt-6 w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold px-6 py-4 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity'>
          <Loader2 size={18} className='animate-spin' /> Verificar acesso
        </button>
      </div>
    </div>
  );
}
