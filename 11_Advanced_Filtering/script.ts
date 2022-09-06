import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: {
        // equals: "Roman",

        // not equal to 'Roman'
        // not: "Roman",

        // in take array and return the result that satisfy the list of value
        // in: ["Roman", "Razz"],
        notIn: ["Roman", "Razz"],
      },
      age: {
        // lt: 20,
        // lt: less then

        gt: 20,
        // gt: greater then
      },
    },
  });

  const user2 = await prisma.user.findMany({
    where: {
      // contains allows to check if the text is inside of another piece of text
      email: {
        contains: "@google",
        // now here it will return all the user that have '@google' it is same as LIKE '%@google%' query

        // get the user which email ends with '.com'
        endsWith: ".com",

        // get the user which email start with 't'
        startsWith: "t",
      },
    },
  });

  const user3 = await prisma.user.findMany({
    where: {
      AND: [
        {
          email: {
            startsWith: "r",
          },
        },
        {
          email: {
            endsWith: "m",
          },
        },
        {
          name: "Razz",
        },
      ],
      OR: [
        {
          email: {
            startsWith: "r",
          },
        },
        {
          email: {
            endsWith: "m",
          },
        },
        {
          name: "Razz",
        },
      ],
      NOT: [
        {
          name: "Roman",
          age: 35,
        },
      ],
    },
  });

  console.log(user, user2, user3);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
