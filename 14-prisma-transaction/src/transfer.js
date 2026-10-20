import { prisma } from "./db.js";

async function main(){
    const transfer=await prisma.$transaction([
        prisma.account.update({
            where:{id:1},
            data:{
                balance:{decrement:200},
            },
        }),

        prisma.account.update({
      where: { id: 2 },
      data: {
        balance: { increment: 200 },
      },
    }),
    ]);


    console.log("Transfer successful!");
  console.log("Alex:", transfer[0].balance.toString());
  console.log("Ani:", transfer[1].balance.toString());
}

main()
  .catch((error) => {
    console.error("Transfer failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });