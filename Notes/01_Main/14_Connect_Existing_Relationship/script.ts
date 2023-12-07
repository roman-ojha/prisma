import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: {
      email: "roman@razz.com",
    },
    data: {
      userPreference: {
        // we can even update the relational table that 'user' can access
        // create: {
        //   // so here we are create new 'userPreference' that is related to this specific user which we are updating on
        //   emailUpdates: true,
        // },
        // we can create but what if we already had created 'userPreference' and we just want to use that userPreference to reference this 'user' then we can use 'connect'
        connect: {
          id: "0f05df1c-3b29-4e3b-aef4-59722d17674f",
          // now here we are searching the user with email and then connecting that 'user' with existing 'userPreference'
        },

        // we can even be able to disconnect to the 'userPreferences'
        // disconnect:{
        //   id: "0f05df1c-3b29-4e3b-aef4-59722d17674f",
        // }
        // because this is one to one relationship we can just do this:
        // disconnect:true
      },
    },
  });

  // we can also be able to use 'connect' and 'disconnect' on 'create' operation

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
