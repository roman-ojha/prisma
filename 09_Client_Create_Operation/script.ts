import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient({ log: ["query"] });
// if we want to see what is going to inside of prisma we can log out the query

const prisma = new PrismaClient();
// Note that when you create this 'PrismaClient' it manage different connection for you if your database support 5 different concurrent connection this prisma client can handle all 5 of those connection for you
// so it is relay important that you use only one instance of this prisma client and you don't create a bunch of them otherwise you could bug down you database through to many connection

async function main() {
  await prisma.user.deleteMany();

  // Creation Operation:
  const user = await prisma.user.create({
    data: {
      name: "Roman",
      email: "razz@roman.com",
      age: 35,
      // UserPreference: {
      //   // now here user preference is of different table and which is related to User table we can access that here as well
      //   // and we can create a new user preference from here as well
      //   create: {
      //     // create can create the brand new preference
      //     emailUpdates: true,
      //   },
      // },
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    // be default we will not going to get the the userPreference that we just created because it is from another table
    // but if you want to see that then we have include
    include: {
      // so here we are include userPreference
      userPreference: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Razz",
      email: "roman@razz.com",
      age: 35,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    // instead of using include we can use select
    select: {
      // here we we can say what are that this that we want in return
      name: true,
      // userPreference: true,
      userPreference: {
        // now again we can nested select to relation table
        select: {
          emailUpdates: true,
        },
      },
    },
    // NOTE that we can only do either select or include
  });

  const user3 = await prisma.user.createMany({
    data: [
      {
        name: "Tom",
        email: "tom@google.com",
        age: 75,
      },
      {
        name: "Kyle",
        email: "kyle@google.com",
        age: 85,
      },
    ],
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
