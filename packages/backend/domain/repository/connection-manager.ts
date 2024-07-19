import { HospitalId } from "../value-object/id.vo.js";
import { Request, Response } from "express";

export interface IConnectionManagerRepository {
  addConnection(id: HospitalId, request: Request, response: Response): Promise<void>;
  removeConnection(id: HospitalId): Promise<void>;
  getConnection(id: HospitalId): Promise<[Request, Response]>;
}

