"use server";

import { createCart, getCart } from "@/lib/db/card";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const incrementProductQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: articleInCart.id,
            },
            data: {
              quantity: articleInCart.quantity + 1,
            },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  }

  revalidatePath("/products/[id]");
};

export default incrementProductQuantity;
