import { PatientMockDB } from "../mock_data/mock-data.js";
import { IPatientRepository } from "../../domain/repository/patient-repository.js";
import { injectable } from "inversify";
import "reflect-metadata";
import { PatientId } from "../../domain/value-object/id.vo.js";
import { PatientEntity } from "../../domain/entity/patient.js";


@injectable()
export class PatientRepositoryImpl implements IPatientRepository {
  findById(id: PatientId): PatientEntity{
    const patient_data = PatientMockDB.getData(id);
    if (patient_data === undefined){
      throw new Error("Data is undefined");
    }
    return new PatientEntity(patient_data.id, patient_data.name)
  }
}