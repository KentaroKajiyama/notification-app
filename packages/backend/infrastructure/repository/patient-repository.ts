import { PatientMockDB } from "../mock_data/mock-data.ts";
import { IPatientRepository } from "../../domain/repository/patient-repository.ts";
import { injectable } from "inversify";
import "reflect-metadata";
import { PatientId } from "../../domain/value-object/id.vo.ts";
import { PatientEntity } from "../../domain/entity/patient.ts";

@injectable()
export class PatientRepositoryImpl implements IPatientRepository {
  async findById(id: PatientId): Promise<PatientEntity>{
    try{
      const patient_data = await PatientMockDB.getData(id);
      return new PatientEntity(patient_data.id, patient_data.name)
    } catch(error){
      console.log(error);
      throw new Error("Data is undefined.");
    }
  }
  async addPatient(patient: PatientEntity): Promise<void>{
    try{
      const patient_data = {
        id: patient.getId,
        name: patient.getName
      }
      await PatientMockDB.addData(patient_data);
    } catch (error) {
      console.log(error)
      throw new Error("There is an error for adding patient data.")
    }
  }
  async removePatient(id: PatientId): Promise<void>{
    try{
      await PatientMockDB.removeData(id);
    } catch (error) {
      console.log(error)
      throw new Error("There is an error for removing patient data.")
    }
  }
}