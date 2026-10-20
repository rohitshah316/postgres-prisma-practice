import {prisma} from "./db.js"

async function transferMoney(fromId,toId,amount){
    return prisma.$transaction(async (tx)=>{
        //1. read the sender account
        const sender=await tx.account.findUnique({
            where:{id:fromId}
        });

        if(!sender){
            throw new Error("Sender account not found.")
        }

        //2. check the balance
        if(sender.balance.lessThan(amount)){
            throw new Error("Insufficient balance");
        }

        //3. deduct money from the sender
        await tx.account.update({
            where:{id:fromId},
            data:{
                balance:{decrement:amount}
            }
        });


        //4. add money to the receiver

        await tx.account.update({
      where: { id: toId },
      data: {
        balance: { increment: amount },
      },
    });

    return { success: true, amount };
    })
}

async function main() {
  try {
    const result = await transferMoney(1, 2, 100);
    console.log("Transfer successful:", result);
  } catch (error) {
    console.log("Transfer rejected:", error.message);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});