import { prisma } from "./db.js";

async function main() {
  // Remove old sample records so this seed is repeatable.
  await prisma.product.deleteMany();

const products = await prisma.product.createManyAndReturn({
  data: [
    { title: "Keyboard", price: 49.99, stock: 10 },
    { title: "Mouse", price: 24.99, stock: 25 },
    { title: "Monitor", price: 199.99, stock: 5 },
    { title: "Headphones", price: 79.99, stock: 15 },
    { title: "Webcam", price: 59.99, stock: 8 },
  ],
});

  console.log("Seeded products:");
  console.table(products);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });


  