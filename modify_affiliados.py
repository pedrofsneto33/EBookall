import re

path = r'c:\Users\User\Documents\recuperajogo\app\afiliados\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the useEffect block
old_block = '''  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/affiliates/me");
        if (res.status === 401) {
          router.replace("/login?redirect=/afiliados");
          return;
        }
        if (res.status === 404) {
          setNotAffiliate(true);
          return;
        }
        if (!res.ok) {
          setNotAffiliate(true);
          return;
        }
        const data = await res.json();
        setCode(data.code ?? "");
        setReferrals(data.referrals ??);
      } catch {
        setNotAffiliate(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);'''

new_block = '''  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/affiliates/me");
        if (res.status === 401) {
          router.push("/afiliados/login");
          return;
        }
        if (res.status === 404) {
          setNotAffiliate(true);
          return;
        }
        if (!res.ok) {
          setNotAffiliate(true);
          return;
        }
        const data = await res.json();
        setCode(data.code ?? "");
        setReferrals(data.referrals ?? []);
      } catch {
        // Erro de rede: apenas definir estado de erro, NÃO redirect
        setNotAffiliate(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);'''

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("File modified successfully")
else:
    print("Old block not found - checking content...")
    # Let's see what the actual content looks like
    print(content[:2000])