import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    // update will update the first user that match the query
    where: {
      // condition through which to update
      email: "roman@razz.com",
      // because update will update the single row that match the query it means that field to query to update need to have unique constraint
    },
    data: {
      // data that we want to update
      name: "RomanOjha",
      age: {
        // we can also add increment and decrement
        increment: 1,
        // decrement:1,

        // so we can do multiply and divide
        // multiply: 10,
        // divide: 10,
      },
    },
  });

  const user2 = await prisma.user.updateMany({
    where: {
      name: "Razz",
    },
    data: {
      name: "Roman",
    },
    // NOTE updateMany will not allow to add 'include' and 'select'
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
