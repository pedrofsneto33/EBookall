'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '../lib/analytics';
import { Loader2, AlertCircle, Clock } from 'lucide-react';

export default function PaginaPagamento() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPix, setLoadingPix] = useState(true);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  // O servidor usa o e-mail da sessão: não precisa enviar nada no corpo. loadingPix já começa true.
  async function fetchPix() {
    try {
      const res = await fetch('/api/pagamento/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.qr_code_base64) {
        setQrCode(data.qr_code_base64);
      } else {
        const msgErro = data.detalhe ? `${data.error}: ${data.detalhe}` : (data.error || 'Falha ao gerar Pix.');
        setError(msgErro);
      }
    } catch (err) {
      setError('Erro ao conectar ao serviço de pagamento.');
    } finally {
      setLoadingPix(false);
    }
  }

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(async (r) => {
        if (!r.ok) {
          router.replace('/login?next=/pagamento');
          return;
        }
        const data = await r.json();
        if (!data.email) {
          setError('Não foi possível identificar seu e-mail. Faça login novamente.');
          setLoading(false);
          return;
        }
        if (data.status === 'active') {
          router.replace('/gerador');
          return;
        }
        setEmail(data.email);
        setLoading(false);
        fetchPix();
      })
      .catch(() => router.replace('/login?next=/pagamento'));
  }, [router]);

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
        {loadingPix ? (
          <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
            <Loader2 size={14} className='animate-spin' /> Gerando seu Pix...
          </div>
        ) : qrCode ? (
          <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-amber-500/10 text-amber-400 border border-amber-500/20'>
            <Clock size={14} /> Aguardando pagamento
          </div>
        ) : null}

        <h1 className='text-2xl font-bold mb-1 text-white'>
          Pagar acesso — R$ 1,00 (Teste)
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
          onClick={() => {
            setError('Verificando pagamento...');
            setTimeout(() => window.location.reload(), 1500);
          }}
          className='mt-6 w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold px-6 py-4 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity'>
          Verificar acesso
        </button>
        <p className='text-xs text-white/40 mt-2'>Após pagar no banco, clique aqui para liberar o acesso.</p>
      </div>
    </div>
  );
}
