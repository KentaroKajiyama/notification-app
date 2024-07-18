import { HospitalId } from "../value-object/id.vo.js";

export interface ConnectionManagerRepository {
  addConnection(id: HospitalId, response: any): void;
  removeConnection(id: HospitalId): void;
  getConnection(id: HospitalId): any | undefined;
}

