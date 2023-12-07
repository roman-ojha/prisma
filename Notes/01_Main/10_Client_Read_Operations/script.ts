import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    // findUnique will allow to find unique rows inside of your database using unique constraint field
    // it will return one user in this case
    where: {
      // find unique by email:
      // email: "razz@roman.com",
      age_name: {
        // 'age_name' is the block level attribute unique attribute that we define
        // now inside this we have to pass the object which is included in that attribute
        age: 35,
        name: "Roman",
      },
    },
    select: {
      name: true,
      email: true,
      id: true,
      userPreference: {
        select: {
          emailUpdates: true,
        },
      },
    },
  });

  const user2 = await prisma.user.findFirst({
    // findFirst will find the first that match the query
    where: {
      name: "Roman",
    },
  });

  const user3 = await prisma.user.findMany({
    // findMany will find many user that match the query
    where: {
      name: "Roman",
    },
    // we can modify the query by adding distinctness
    distinct: ["age", "email"],
    // here now it will return the array of user with name 'Roman' and user 'age' & 'email' needs to be distinct

    // also we can add pagination on query
    // pagination where you will specify how many you want to return
    take: 2,
    // so here it will return 2 user

    // and also we can skip some result
    skip: 1,

    // and alow we can add order by
    orderBy: {
      age: "asc",
      // here we are ordering by age in ascending order
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
