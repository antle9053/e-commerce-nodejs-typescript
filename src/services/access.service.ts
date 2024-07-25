import { Role, Shop } from "../models/shop.model";
import { prisma } from "../dbs/init.mongodb";
import argon2 from "argon2";
import * as crypto from "node:crypto";
import { KeyService } from "./key.service";
import { createTokenPair } from "../utils/auth.utils";

export class AccessService {
  static async register(payload: Shop) {
    try {
      const { password, name, email } = payload;

      const holderShop = await prisma.shops.findUnique({
        where: {
          email,
        },
      });

      if (holderShop) {
        return {
          code: "xxx",
          message: "Shop already exists",
        };
      }

      const hashedPassword = await argon2.hash(password, {
        salt: crypto.randomBytes(10),
      });

      const newShop = await prisma.shops.create({
        data: {
          password: hashedPassword,
          name,
          email,
          roles: [Role.SHOP],
        },
      });

      if (newShop) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        const publicKeyString = await KeyService.createKeyToken({
          shopId: newShop.id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "publicKeyString error",
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        const tokens = await createTokenPair(
          {
            shopId: newShop.id,
            email: newShop.email,
          },
          publicKeyObject,
          privateKey,
        );

        return {
          code: 201,
          data: {
            shop: newShop,
            tokens,
          },
        };
      }
      return {
        code: 200,
        data: null,
      };
    } catch (error: unknown) {
      if (typeof error === "object") {
        return {
          code: 500,
          data: error === null ? "Error" : error.toString(),
        };
      } else if (typeof error === "string") {
        return {
          code: 500,
          data: error,
        };
      }
    }
  }
}
