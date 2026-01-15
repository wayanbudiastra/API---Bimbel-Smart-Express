
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Seed Admin
  await prisma.user.upsert({
    where: { email: 'admin@bimbel.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@bimbel.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Seed Guru
  const guru = await prisma.user.upsert({
    where: { email: 'guru@bimbel.com' },
    update: {},
    create: {
      name: 'Budi Guru',
      email: 'guru@bimbel.com',
      password: hashedPassword,
      role: 'GURU',
    },
  });

  // Seed Siswa
  await prisma.user.upsert({
    where: { email: 'siswa@bimbel.com' },
    update: {},
    create: {
      name: 'Andi Siswa',
      email: 'siswa@bimbel.com',
      password: hashedPassword,
      role: 'SISWA',
    },
  });

  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
