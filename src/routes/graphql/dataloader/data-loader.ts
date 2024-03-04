import { PrismaClient } from "@prisma/client";

export const userBatchFunction = async (userIds: string[], db: PrismaClient) =>  {
  const results = await db.user.findMany({ where: { id: { in: userIds } } });
  const sortedInIdsOrder = userIds.map(id => results.find(x => x.id === id));
  return sortedInIdsOrder;
} 