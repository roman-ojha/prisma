import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // you will write yuo prisma client queries here

  const createdUser = await prisma.user.create({ data: { name: "Roman" } });
  // so here we can see that we are able to use 'user' model that we have add into prisma file
  // now we can query for that user
  console.log(createdUser);

  const user = await prisma.user.findMany();
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    // here after running all of our code we ware disconnecting from database
    await prisma.$disconnect();
  });
