import { PatientEntity } from "../entity/patient.js";
import { PatientId } from "../value-object/id.vo.js";

export interface PatientRepository {
  findById(id: PatientId): Promise<PatientEntity>;
}
