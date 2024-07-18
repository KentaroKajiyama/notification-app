import { HospitalId } from "../value-object/id.vo.js";
import { Response } from "express";

export class ConnectionManager {
  private connections: Map<HospitalId, Response> = new Map();

  addConnection(id: HospitalId, response: Response): void {
    this.connections.set(id, response);
  }

  removeConnection(id: HospitalId): void {
    this.connections.delete(id);
  }

  getConnection(id: HospitalId): Response | undefined {
    return this.connections.get(id);
  }
}