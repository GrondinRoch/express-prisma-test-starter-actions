import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import prisma from "../../src/config/prisma.js";

const data = {
  client: "TEST2",
  items: [
    {
      article: "Article",
      price: 320,
      qty: 2,
    },
    {
      article: "Article",
      price: 1,
      qty: 10,
    },
  ],
};

describe("Test Commande Controller", () => {
  beforeAll(async () => {
    await prisma.item.deleteMany();
    await prisma.order.deleteMany();
  });

  test("Index retourne les commandes", async () => {
    await prisma.order.create({
      data: {
        customer: data.client,
        items: {
          create: data.items,
        },
        total: 354,
      },
    });

    const res = await request(app).get("/api/commandes");
    expect(res.statusCode).toEqual(200);
    expect(res.body.commandes).toHaveLength(1);
    expect(res.body.commandes[0]).toHaveProperty("customer");
    expect(res.body.commandes[0]).toHaveProperty("items");
    expect(res.body.commandes[0]).toHaveProperty("total");
  });

  test("Store enregistre une commande", async () => {
    const res = await request(app).post("/api/commandes").send(data);

    expect(res.statusCode).toEqual(201);
    expect(res.body.commande).toHaveProperty("customer");
    expect(res.body.commande).toHaveProperty("items");
    expect(res.body.commande).toHaveProperty("total");
  });

  afterAll(async () => {
    prisma.$disconnect();
  });
});
