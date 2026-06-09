import prisma from "../src/config/prisma.js";

const orders = [
  {
    customer: "Mamadou Diallo",
    items: [
      { article: "Clavier mecanique", qty: 1, price: 45.5 },
      { article: "Souris sans fil", qty: 2, price: 18.99 },
    ],
  },
  {
    customer: "Aicha Sow",
    items: [
      { article: "Ecran 24 pouces", qty: 1, price: 129.9 },
      { article: "Cable HDMI", qty: 3, price: 6.5 },
    ],
  },
  {
    customer: "Ibrahima Ba",
    items: [
      { article: "Casque audio", qty: 1, price: 35 },
      { article: "Support ordinateur", qty: 1, price: 22.75 },
      { article: "Hub USB-C", qty: 2, price: 14.9 },
    ],
  },
];

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.qty * item.price, 0);
};

const main = async () => {
  await prisma.item.deleteMany();
  await prisma.order.deleteMany();

  for (const order of orders) {
    await prisma.order.create({
      data: {
        customer: order.customer,
        total: calculateTotal(order.items),
        items: {
          create: order.items,
        },
      },
    });
  }

  console.log(`${orders.length} commandes inserées.`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
