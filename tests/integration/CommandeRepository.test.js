import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import CommandeRepository from "../../src/CommandeRepository.js";
import prisma from "../../src/config/prisma.js";

const data = {
  client: "Client 2",
  items: [
    {
      article: "Article",
      price: 10,
      qty: 10,
    },
  ],
};

const repository = new CommandeRepository();

describe("Test Commande Repository", () => {
  beforeAll(async () => {
    await prisma.item.deleteMany();
    await prisma.order.deleteMany();
  });

  test("Index retourne les commandes", async () => {
    let res = await repository.index();
    const size = res.commandes.length;

    await repository.store(data);

    const result = await repository.index();

    expect(result.commandes.length).toBeGreaterThan(0);
    expect(result.commandes[0]).toHaveProperty("customer");
    expect(result.commandes[0]).toHaveProperty("items");
    expect(result.commandes[0]).toHaveProperty("total");
  });

  test("Store enregistre commande", async () => {
    let res = await repository.index();
    const size = res.commandes.length;

    await repository.store(data);

    res = await repository.index();
    expect(res.commandes).toHaveLength(res.commandes.length);
    expect(res.commandes[res.commandes.length - 1]).toHaveProperty("customer");
  });

  afterAll(async () => {
    prisma.$disconnect();
  });
});
