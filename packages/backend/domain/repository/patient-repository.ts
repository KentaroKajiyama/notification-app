import { PatientEntity } from "../entity/patient.ts";
import { PatientId } from "../value-object/id.vo.ts";

export interface IPatientRepository {
  findById(id: PatientId): Promise<PatientEntity>;
  addPatient(patient: PatientEntity): Promise<void>;
  removePatient(id: PatientId): Promise<void>;
}
