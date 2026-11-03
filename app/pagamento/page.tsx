'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '../lib/analytics';
import { Loader2, AlertCircle, Clock, Copy, Check } from 'lucide-react';
import { PRECO_TXT } from '../lib/config';

export default function PaginaPagamento() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPix, setLoadingPix] = useState(true);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copiaECola, setCopiaECola] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [verificando, setVerificando] = useState(false);

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
        setCopiaECola(data.qr_code ?? '');
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

  // Confere se o pagamento já foi confirmado (o webhook libera o acesso).
  async function conferirAcesso(): Promise<boolean> {
    try {
      const r = await fetch('/api/auth/me', { credentials: 'include' });
      if (!r.ok) return false;
      const d = await r.json();
      if (d?.status === 'active') {
        router.replace('/gerador');
        return true;
      }
    } catch {
      /* sem rede: tenta de novo no próximo ciclo */
    }
    return false;
  }

  // Enquanto o Pix está na tela, confere a cada 5 segundos.
  useEffect(() => {
    if (!qrCode) return;
    const id = setInterval(() => { void conferirAcesso(); }, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCode]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(copiaECola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setError('Não consegui copiar. Selecione o código e copie manualmente.');
    }
  }

  async function verificar() {
    setVerificando(true);
    setError('');
    const ok = await conferirAcesso();
    if (!ok) setError('Pagamento ainda não confirmado. Pode levar até 1 minuto depois de pagar.');
    setVerificando(false);
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
          Pagar acesso — R$ {PRECO_TXT}
        </h1>

        {loadingPix && !qrCode ? (
          <p className='text-sm mb-4 text-white/60'>Gerando seu Pix...</p>
        ) : (
          qrCode ? (
            <div className='mb-6'>
              <img
                src={'data:image/png;base64,' + qrCode}
                alt='QR Code Pix'
                className='w-64 h-64 mx-auto rounded-xl'
              />
              <p className='text-xs text-white/60 mt-2'>Leia o QR Code com o app do seu banco</p>
              {copiaECola && (
                <div className='mt-4 text-left'>
                  <p className='text-xs text-white/60 mb-1'>Ou pague pelo celular com Pix copia e cola:</p>
                  <textarea
                    readOnly
                    value={copiaECola}
                    rows={3}
                    onFocus={(e) => e.currentTarget.select()}
                    className='w-full text-xs rounded-lg bg-black/30 border border-white/10 text-white/80 p-2 break-all'
                  />
                  <button
                    type='button'
                    onClick={copiar}
                    className='mt-2 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10'
                  >
                    {copiado ? <><Check size={16} /> Copiado!</> : <><Copy size={16} /> Copiar código Pix</>}
                  </button>
                </div>
              )}
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
          onClick={verificar}
          disabled={verificando}
          className='mt-6 w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold px-6 py-4 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity'>
          {verificando ? 'Verificando...' : 'Já paguei, verificar acesso'}
        </button>
        {qrCode && error && <p className='text-xs text-amber-400 mt-3'>{error}</p>}
        <p className='text-xs text-white/40 mt-2'>Depois de pagar, o acesso é liberado sozinho em instantes. Esta tela confere a cada 5 segundos.</p>
      </div>
    </div>
  );
}
