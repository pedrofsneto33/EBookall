path = r'c:\\Users\\User\\Documents\\recuperajogo\\app\\pagamento\\page.tsx'

with open(path, 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Fix 1: Add setLoading(false) after setEmail and fetchPix
old1 = "        setEmail(data.email);\n        fetchPix();"
new1 = "        setEmail(data.email);\n        setLoading(false);\n        fetchPix();"
assert old1 in content, "old1 not found"
content = content.replace(old1, new1)

# Fix 2: Guard fetchPix against empty email
old2 = "  const fetchPix = async () => {\n    setLoadingPix(true);"
new2 = "  const fetchPix = async () => {\n    if (!email) return;\n    setLoadingPix(true);"
assert old2 in content, "old2 not found"
content = content.replace(old2, new2)

# Fix 3: Guard useEffect against empty email
old3 = "  useEffect(() => {\n    fetchPix();\n  }, [email]);"
new3 = "  useEffect(() => {\n    if (email) {\n      fetchPix();\n    }\n  }, [email]);"
assert old3 in content, "old3 not found"
content = content.replace(old3, new3)

# Fix 4: Change error message to use server error
old4 = "        setError('Falha ao gerar Pix. Tente novamente.');"
new4 = "        setError(data.error || 'Falha ao gerar Pix. Tente novamente.');"
assert old4 in content, "old4 not found"
content = content.replace(old4, new4)

# Fix 5: Change redirect to error message for missing email
old5 = "        if (!data.email) {\n          router.replace('/login?next=/pagamento');\n          return;\n        }"
new5 = "        if (!data.email) {\n          setError('Não foi possível identificar seu e-mail. Faça login novamente.');\n          setLoading(false);\n          return;\n        }"
assert old5 in content, "old5 not found"
content = content.replace(old5, new5)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All fixes applied successfully")