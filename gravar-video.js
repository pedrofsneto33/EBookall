const { chromium } = require('playwright');
require('dotenv').config({ path: './.env.local' });

async function record() {
  const email = 'pedrofsneto33@gmail.com';
  const adminSecret = process.env.ADMIN_SECRET || 'rj_admin_2026';

  console.log('Iniciando gravação (headless)...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    recordVideo: { dir: 'demo-video/', size: { width: 1280, height: 720 } },
  });

  const page = await context.newPage();

  console.log('Liberando acesso...');
  await page.request.post('http://localhost:3000/api/admin/grant', {
    data: { email: email, key: adminSecret }
  });

  console.log('Fazendo login...');
  await page.request.post('http://localhost:3000/api/auth/session', {
    data: { email: email }
  });

  console.log('Abrindo gerador...');
  await page.goto('http://localhost:3000/gerador', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  await page.getByRole('button', { name: /Autoexclusão Ignorada/ }).click();
  await page.waitForTimeout(800);

  await page.getByRole('button', { name: 'Continuar' }).first().click();
  await page.waitForTimeout(1000);

  await page.getByLabel('Nome do autor').fill('João da Silva Teste');
  await page.getByLabel('CPF').fill('111.444.777-35');
  await page.getByLabel('Endereço').fill('Rua das Flores, 123, Centro, Teresina-PI');
  await page.getByLabel('Comarca').fill('Teresina');
  await page.getByLabel('UF').fill('PI');
  await page.getByLabel('Casa ré').fill('Bet Nacional LTDA');
  await page.getByLabel('CNPJ ré').fill('11.222.333/0001-81');
  
  await page.getByLabel('Data da autoexclusão').fill('2026-01-10');
  await page.getByLabel('Data do fato').fill('2026-01-15');
  
  await page.getByLabel('Valor material R$').fill('380');
  await page.getByLabel('Relato dos fatos').fill('Fiz a autoexclusão no dia 10/01/2026 pelo site do gov.br. Mesmo assim, a plataforma aceitou o meu depósito de 380 reais no dia 15/01/2026 e permitiu que eu apostasse tudo.');
  
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Continuar' }).last().click();
  await page.waitForTimeout(1000);

  await page.getByText('Li o aviso e vou revisar o rascunho antes de protocolar.').click();
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: /Gerar petição/ }).click();
  
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Baixar PDF' }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  await context.close();
  await browser.close();
  console.log('✅ Vídeo gerado em 1280x720. Verifique a pasta demo-video/');
}

record().catch((err) => {
  console.error('❌ Erro:', err);
  process.exit(1);
});