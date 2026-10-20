import { prisma } from "./db.js";

async function transferMoney(fromId, toId, amount) {
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error("Amount must be a positive whole number");
  }

  return prisma.$transaction(async (tx) => {
    // Debit only if the account has enough money.
    const debit = await tx.account.updateMany({
      where: {
        id: fromId,
        balance: { gte: amount },
      },
      data: {
        balance: { decrement: amount },
      },
    });

    if (debit.count !== 1) {
      throw new Error("Sender not found or insufficient balance");
    }

    // Credit the receiver.
    const credit = await tx.account.updateMany({
      where: { id: toId },
      data: {
        balance: { increment: amount },
      },
    });

    if (credit.count !== 1) {
      throw new Error("Receiver not found");
    }

    return { success: true, amount };
  });
}

async function main() {
  try {
    const result = await transferMoney(1, 23, 100);
    console.log("Transfer successful:", result);
  } catch (error) {
    console.log("Transfer rejected:", error.message);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});