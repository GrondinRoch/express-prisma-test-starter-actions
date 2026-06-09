import TarifService from "./Services/TarifService.js";
import prisma from "./config/prisma.js";

export default class CommandeRepository {
  index = async () => {
    const commandes = await prisma.order.findMany({
      include: { items: true },
    });
    return { commandes };
  };

  store = async (data) => {
    let total = 0;
    data.items.forEach((item) => {
      total += TarifService.calculTotalLigne(item.price, item.qty);
    });

    const commande = await prisma.order.create({
      data: {
        customer: data.client,
        items: {
          create: data.items,
        },
        total: total,
      },
      include: { items: true },
    });

    return { commande };
  };
}
