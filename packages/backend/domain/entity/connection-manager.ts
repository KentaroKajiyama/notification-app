import { HospitalId } from "../value-object/id.vo.js";
import { Request,Response } from "express";

export class ConnectionManager {
  private _connections: Map<HospitalId, [Request,Response]> = new Map();

  constructor(connections: Map<HospitalId, [Request, Response]>) {
    this._connections = connections;
  }
}