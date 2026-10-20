import { createHash, randomBytes } from "crypto";
import {prisma} from "./db.js";

async function main(){
    const userId=1;

    //generate a cryptographically secure random token
    const rawToken=randomBytes(32).toString("hex");

    //store only the token hash
    const tokenHash=createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const expiresAt=new Date(Date.now()+7*24*60*60*1000);

    const token=await prisma.refreshToken.create({
        data:{
            tokenHash,
            expiresAt,
            userId
        },
        select:{
            id: true,
            userId:true,
            expiresAt:true,
            revoked:true,
            createdAt:true,
        },
    });

    console.log("Refresh token created:");
    console.log(token);

    //  In a real authentication flow, deliver the raw token securely
  // to the client. Do not log it in production.
  console.log("Demo raw token:", rawToken);
}


main()
  .catch((error) => {
    console.error("Token creation failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });