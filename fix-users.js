const fs = require('fs');

// ============ FIX 1: interface PeticaoRecord ============
const usersPath = 'app/lib/users.ts';
let users = fs.readFileSync(usersPath, 'utf8');

const ifaceRegex = /export interface PeticaoRecord \{[\s\S]*?\}/;
const ifaceAntiga = users.match(ifaceRegex)?.[0] || '';
console.log('Interface atual:\n' + ifaceAntiga + '\n');

const ifaceNova = `export interface PeticaoRecord {
  id: number;
  perfil: string;
  valorCausa: string | null;
  texto: string;
  createdAt: string;
}`;

if (ifaceAntiga !== ifaceNova) {
  users = users.replace(ifaceRegex, ifaceNova);
  fs.writeFileSync(usersPath, users, 'utf8');
  console.log('✅ Interface PeticaoRecord corrigida');
} else {
  console.log('ℹ️ Interface já estava correta');
}

// ============ FIX 2: INSERT na rota /api/peticao ============
const routePath = 'app/api/peticao/route.ts';
let route = fs.readFileSync(routePath, 'utf8');

if (route.includes('INSERT INTO peticoes')) {
  console.log('ℹ️ INSERT já existe na rota');
} else {
  const alvo = `    const inc = await incrementPeticoes(session.email);
    if (!inc.ok) return NextResponse.json({ error: inc.error || "Erro ao registrar" }, { status: 500 });`;
  
  const insercao = `    const inc = await incrementPeticoes(session.email);
    if (!inc.ok) return NextResponse.json({ error: inc.error || "Erro ao registrar" }, { status: 500 });

    // Salvar a petição no histórico
    try {
      const { ensureDb } = await import("../../../lib/db");
      const db = await ensureDb();
      await db.execute({
        sql: \`INSERT INTO peticoes (email, perfil, valor_causa, texto) VALUES (?, ?, ?, ?)\`,
        args: [session.email, valid.data.perfil, String(resultado.valorCausa), resultado.texto],
      });
    } catch (e) {
      console.error("Falha ao salvar petição no histórico:", e);
    }`;
  
  if (!route.includes(alvo)) {
    console.error('❌ Bloco de incrementPeticoes não encontrado na rota. O código pode estar diferente.');
    process.exit(1);
  }
  
  route = route.replace(alvo, insercao);
  fs.writeFileSync(routePath, route, 'utf8');
  console.log('✅ INSERT adicionado na rota /api/peticao');
}

console.log('\n🎉 Fixes concluídos');