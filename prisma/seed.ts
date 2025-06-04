import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Cria famílias de plantas
  const familias = [
    'Apiaceae',
    'Amaranthaceae',
    'Cucurbitaceae',
    'Solanaceae',
    'Fabaceae',
    'Amaryllidaceae',
    'Lamiaceae',
  ];

  const familiaMap = new Map<string, number>();

  for (const nome of familias) {
    const familia = await prisma.familiaPlanta.create({
      data: { nome },
    });
    familiaMap.set(nome, familia.id);
  }

  // Cria plantas
  await prisma.planta.createMany({
    data: [
      {
        nomePopular: 'Coentro',
        nomeCientifico: 'Coriandrum sativum',
        idFamilia: familiaMap.get('Apiaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno ou 4h diárias',
        temperaturaIdeal: 21.5,
        alturaMax: 50,
        larguraMax: 30,
        velocidadeAltura: 40,
        velocidadeLargura: 30,
      },
      {
        nomePopular: 'Espinafre',
        nomeCientifico: 'Spinacia oleracea',
        idFamilia: familiaMap.get('Amaranthaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno ou meia-sombra (4h mín.)',
        temperaturaIdeal: 16,
        alturaMax: 30,
        larguraMax: 30,
        velocidadeAltura: 45,
        velocidadeLargura: 30,
      },
      {
        nomePopular: 'Abobrinha',
        nomeCientifico: 'Cucurbita pepo',
        idFamilia: familiaMap.get('Cucurbitaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno (6h mín.)',
        temperaturaIdeal: 25,
        alturaMax: 60,
        larguraMax: 100,
        velocidadeAltura: 60,
        velocidadeLargura: 45,
      },
      {
        nomePopular: 'Tomate',
        nomeCientifico: 'Solanum lycopersicum',
        idFamilia: familiaMap.get('Solanaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno (6h mín.)',
        temperaturaIdeal: 25,
        alturaMax: 150,
        larguraMax: 50,
        velocidadeAltura: 80,
        velocidadeLargura: 60,
      },
      {
        nomePopular: 'Feijão',
        nomeCientifico: 'Phaseolus vulgaris',
        idFamilia: familiaMap.get('Fabaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno (6h mín.)',
        temperaturaIdeal: 25,
        alturaMax: 60,
        larguraMax: 30,
        velocidadeAltura: 90,
        velocidadeLargura: 60,
      },
      {
        nomePopular: 'Pimenta',
        nomeCientifico: 'Capsicum spp.',
        idFamilia: familiaMap.get('Solanaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo úmido sem encharcar',
        exposicaoSolar: 'Sol pleno (4-6h mín.)',
        temperaturaIdeal: 25,
        alturaMax: 150,
        larguraMax: 100,
        velocidadeAltura: 90,
        velocidadeLargura: 90,
      },
      {
        nomePopular: 'Cebolinha',
        nomeCientifico: 'Allium schoenoprasum',
        idFamilia: familiaMap.get('Amaryllidaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno (4h mín.)',
        temperaturaIdeal: 18.5,
        alturaMax: 60,
        larguraMax: 30,
        velocidadeAltura: 120,
        velocidadeLargura: 90,
      },
      {
        nomePopular: 'Salsa',
        nomeCientifico: 'Petroselinum crispum',
        idFamilia: familiaMap.get('Apiaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '2-3x/semana, solo levemente úmido',
        exposicaoSolar: 'Sol pleno (4h mín.)',
        temperaturaIdeal: 20,
        alturaMax: 80,
        larguraMax: 30,
        velocidadeAltura: 120,
        velocidadeLargura: 90,
      },
      {
        nomePopular: 'Alecrim',
        nomeCientifico: 'Rosmarinus officinalis',
        idFamilia: familiaMap.get('Lamiaceae')!,
        ambienteCultivo: 'Interno ou externo',
        frequenciaIrrigacao: '1x/semana, regar quando o solo estiver seco',
        exposicaoSolar: 'Sol pleno (6h mín.)',
        temperaturaIdeal: 20,
        alturaMax: 100,
        larguraMax: 100,
        velocidadeAltura: 240,
        velocidadeLargura: 240,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
