path = r'c:\Users\User\Documents\recuperajogo\app\pagamento\page.tsx'

with open(path, 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Fix 1: Add Clock to imports
old_import = "import { Loader2, AlertCircle } from 'lucide-react';"
new_import = "import { Loader2, AlertCircle, Clock } from 'lucide-react';"
assert old_import in content, "import not found"
content = content.replace(old_import, new_import)

# Fix 2: Replace the badge conditional
old_badge = """        <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
          <Loader2 size={14} className='animate-spin' /> Gerando seu Pix...
        </div>"""
new_badge = """        {loadingPix ? (
          <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
            <Loader2 size={14} className='animate-spin' /> Gerando seu Pix...
          </div>
        ) : qrCode ? (
          <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-amber-500/10 text-amber-400 border border-amber-500/20'>
            <Clock size={14} /> Aguardando pagamento
          </div>
        ) : null}"""
assert old_badge in content, "badge not found"
content = content.replace(old_badge, new_badge)

# Fix 3: Replace the button
old_button = """        <button
          type='button'
          onClick={() => router.push('/')}
          className='mt-6 w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold px-6 py-4 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity'>
          <Loader2 size={18} className='animate-spin' /> Verificar acesso
        </button>"""
new_button = """        <button
          type='button'
          onClick={() => {
            setError('Verificando pagamento...');
            setTimeout(() => window.location.reload(), 1500);
          }}
          className='mt-6 w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold px-6 py-4 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity'>
          Verificar acesso
        </button>
        <p className='text-xs text-white/40 mt-2'>Após pagar no banco, clique aqui para liberar o acesso.</p>"""
assert old_button in content, "button not found"
content = content.replace(old_button, new_button)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All UX fixes applied successfully")