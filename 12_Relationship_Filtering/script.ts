import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findMany({
    where: {
      // also we can query on relation ship with the other table
      userPreference: {
        // and because 'userPreference' is relation to 'user' table we can query all the stuff from user to 'userPreference'
        emailUpdates: true,
      },
      writtenPosts: {
        // so here we are querying on many to many relationship so:
        // every: for every writtenPosts that have the query
        // none: none of then have the query
        // some: some have the query
        every: {
          createdAt: new Date(),
          title: "test",
        },
      },
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      author: {
        // author is pointing to "User" table
        is: {
          name: "Roman",
        },
      },
    },
  });

  console.log(user, posts);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
