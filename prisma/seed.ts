import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding....');

  // Regular size
  const regularSize = await prisma.sizes.upsert({
    where: { slug: slugify('regular') },
    update: {},
    create: {
      name: 'R',
      slug: slugify('regular'),
    },
  });

  // Large size
  const largeSize = await prisma.sizes.upsert({
    where: { slug: slugify('large') },
    update: {},
    create: {
      name: 'L',
      slug: slugify('large'),
    },
  });

  // Extra Large size
  const xtraLargeSize = await prisma.sizes.upsert({
    where: { slug: slugify('extra large') },
    update: {},
    create: {
      name: 'XL',
      slug: slugify('extra large'),
    },
  });

  const gr250Size = await prisma.sizes.upsert({
    where: { slug: slugify('250 gr') },
    update: {},
    create: {
      name: '250 gr',
      slug: slugify('250 gr'),
    },
  });

  const gr300Size = await prisma.sizes.upsert({
    where: { slug: slugify('300 gr') },
    update: {},
    create: {
      name: '300 gr',
      slug: slugify('300 gr'),
    },
  });

  const gr500Size = await prisma.sizes.upsert({
    where: { slug: slugify('500 gr') },
    update: {},
    create: {
      name: '500 gr',
      slug: slugify('500 gr'),
    },
  });

  console.log(regularSize);
  console.log(largeSize);
  console.log(xtraLargeSize);
  console.log(gr250Size);
  console.log(gr300Size);
  console.log(gr500Size);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
