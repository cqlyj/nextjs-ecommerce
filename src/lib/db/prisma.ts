import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaBase = globalThis.prismaGlobal ?? prismaClientSingleton();

const prisma = prismaBase.$extends({
  query: {
    cart: {
      async update({ args, query }) {
        args.data = { ...args.data, updatedAt: new Date() };
        return query(args);
      },
    },
  },
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prismaBase;
