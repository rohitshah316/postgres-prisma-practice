import {prisma} from "./db.js"

async function main(){
    const user=await prisma.user.create({
        data:{
            name:"Alex",
            email:"alex@gmail.com",
        },
    });

    console.log("Created user:",user);

    const foundUser=await prisma.user.findUnique({
        where:{
            email:"alex@gmail.com"
        },
    });

    console.log("Found user:",foundUser);
}

main()
    .catch(err=>{
        console.error("Databse operation failed:",err);
        process.exitCode=1;
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    });



//     Quick Notes
// Created project folder — mkdir 08-prisma-setup-and-first-migration

// Initialized Node.js — npm init -y created package.json.

// Created a new database — Created prisma_practice while keeping postgres_practice unchanged.

// Installed Prisma — Installed matching prisma@7.10.1 and @prisma/client@7.10.1.

// Initialized Prisma — npx prisma init --datasource-provider postgresql generated the Prisma configuration and schema files.

// Configured database connection — Set DATABASE_URL in .env and configured prisma7.config.ts.

// Defined the User model — Added id, name, email, and createdAt to prisma/schema.prisma.

// Validated the schema — npx prisma validate checked that the schema was valid.

// Created the first migration — npx prisma migrate dev --name init created the "User" table and migration history.

// Verified the database table — Used psql, \dt, and \d "User" to inspect the table and its constraints.

// Generated Prisma Client — npx prisma generate generated the client in generated/prisma.

// Installed the PostgreSQL adapter — npm install pg @prisma/adapter-pg installed the driver and adapter required for Prisma 7.

// Configured Prisma Client — Created src/db.js to connect Prisma Client to PostgreSQL.

// Enabled ES modules — Added "type": "module" to package.json to support import and export.

// Ran the first Node.js query — Created src/first-query.js to insert a user and retrieve it using Prisma Client.

// Opened Prisma Studio — npx prisma studio opened a visual interface to explore database records.

// Important files to remember
// prisma/schema.prisma — Defines database models and fields.

// prisma7.config.ts — Configures Prisma CLI and the database connection.

// .env — Stores the database connection string.

// prisma/migrations/ — Stores migration history and generated SQL.

// generated/prisma/ — Contains the generated Prisma Client.

// src/db.js — Configures and exports the Prisma Client instance.

// src/first-query.js — Demonstrates creating and retrieving a user.