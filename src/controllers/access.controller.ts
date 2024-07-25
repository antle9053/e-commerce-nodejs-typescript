import { NextFunction, Request, Response } from "express";
import { AccessService } from "../services/access.service";

export class AccessController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      return res.status(200).json(await AccessService.register(req.body));
    } catch (error) {
      next(error);
    }
  }
}
