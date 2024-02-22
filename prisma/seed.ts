import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding....');

  /*=============== Default Product Size =============== */
  // Regular size
  await prisma.sizes.upsert({
    where: { slug: slugify('regular') },
    update: {},
    create: {
      name: 'R',
      slug: slugify('regular'),
    },
  });

  // Large size
  await prisma.sizes.upsert({
    where: { slug: slugify('large') },
    update: {},
    create: {
      name: 'L',
      slug: slugify('large'),
    },
  });

  // Extra Large size
  await prisma.sizes.upsert({
    where: { slug: slugify('extra large') },
    update: {},
    create: {
      name: 'XL',
      slug: slugify('extra large'),
    },
  });

  // 250gr size
  await prisma.sizes.upsert({
    where: { slug: slugify('250 gr') },
    update: {},
    create: {
      name: '250 gr',
      slug: slugify('250 gr'),
    },
  });

  // 300gr size
  await prisma.sizes.upsert({
    where: { slug: slugify('300 gr') },
    update: {},
    create: {
      name: '300 gr',
      slug: slugify('300 gr'),
    },
  });

  // 500gr size
  await prisma.sizes.upsert({
    where: { slug: slugify('500 gr') },
    update: {},
    create: {
      name: '500 gr',
      slug: slugify('500 gr'),
    },
  });

  /*=============== Default Delivery Methods =============== */

  // Home Delivery
  await prisma.deliveryMethods.upsert({
    where: { slug: slugify('home delivery') },
    update: {},
    create: {
      name: 'Home Delivery',
      slug: slugify('home delivery'),
    },
  });

  // Dine In
  await prisma.deliveryMethods.upsert({
    where: { slug: slugify('dine in') },
    update: {},
    create: {
      name: 'Dine In',
      slug: slugify('dine in'),
    },
  });

  // Take Away
  await prisma.deliveryMethods.upsert({
    where: { slug: slugify('take away') },
    update: {},
    create: {
      name: 'Take Away',
      slug: slugify('take away'),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Database seeded');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
