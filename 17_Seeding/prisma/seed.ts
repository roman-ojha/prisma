import { PrismaClient } from "@prisma/client";
// importing the data that we will seed
import { users } from "../data/users";

const prisma = new PrismaClient();

async function main() {
  // now inside user we will create the new user by passing the list of user
  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((err) => {})
  .finally(async () => {
    await prisma.$disconnect();
  });
