import { Key } from "../models/key.model";
import { prisma } from "../dbs/init.mongodb";

export class KeyService {
  static async createKeyToken(payload: Key): Promise<string | null> {
    try {
      const { publicKey, shopId } = payload;
      const publicKeyString = publicKey.toString();
      const tokens = await prisma.keys.create({
        data: {
          publicKey: publicKeyString,
          shop: {
            connect: {
              id: shopId,
            },
          },
        },
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return "error";
    }
  }
}
