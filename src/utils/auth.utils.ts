import JWT from "jsonwebtoken";
import * as crypto from "node:crypto";

export interface TokenPayload {
  shopId: string;
  email: string;
}

export const createTokenPair = async (
  payload: TokenPayload,
  publicKey: crypto.KeyObject,
  privateKey: string,
) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {}
};
