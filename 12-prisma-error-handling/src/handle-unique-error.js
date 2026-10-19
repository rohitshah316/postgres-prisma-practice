import { Prisma } from "../generated/prisma/client.ts";
import { prisma } from "./db.js"

async function main() {
    try {
        await prisma.user.create({
            data: {
                name: "Another Alex",
                email: "alex@example.com",
            },
        });

        console.log("User registered successfully.");
    } catch (error) {
       if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==="P2002"){
       console.log("Registration failed: email already exists.");
    } else {
      console.error("Unexpected error:", error);
    }

    }
}


main().finally(async () => {
  await prisma.$disconnect();
});