import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.delete({
    // delete one 'user' from the table
    where: {
      // and field need to have unique constraint
      email: "roman@razz.com",
    },
  });

  const user2 = await prisma.user.deleteMany({
    where: {
      age: {
        gt: 20,
      },
    },
  });
  console.log(user, user2);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
