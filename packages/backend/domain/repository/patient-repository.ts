import { PatientEntity } from "../entity/patient.test.js";
import { PatientId } from "../value-object/id.vo.js";
import { injectable } from "inversify";

export interface IPatientRepository {
  findById(id: PatientId): PatientEntity;
}
