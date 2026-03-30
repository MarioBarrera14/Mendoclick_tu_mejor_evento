// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // 1. Encriptamos la clave (poné la que quieras acá)
  const passwordHasheada = await bcrypt.hash('tu_clave_secreta_123', 10);

  // 2. Creamos o actualizamos al usuario Mario
  const admin = await prisma.user.upsert({
    where: { email: 'mario@mendoclick.com' },
    update: {},
    create: {
      email: 'mario@mendoclick.com',
      password: passwordHasheada,
      role: 'ADMIN', // Importante: debe coincidir con tu Enum de Prisma
    },
  });

  console.log('✅ Usuario Administrador creado con éxito:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });