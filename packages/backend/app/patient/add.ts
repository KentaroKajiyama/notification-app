import { IPatientRepository } from "../../domain/repository/patient-repository.ts";
import { PatientEntity } from "../../domain/entity/patient.ts";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../di/types.ts";

type PatientDto ={
  id: string;
  name: string;
};

export interface IAddPatientUseCase{
  execute(patient: PatientDto): Promise<void>
}
@injectable()
export class AddPatientUseCaseImpl implements IAddPatientUseCase{
  private _patientRepository: IPatientRepository
  constructor(@inject(TYPES.IPatientRepository) patientRepository: IPatientRepository){
    this._patientRepository = patientRepository
  }
  async execute(patient_dto: PatientDto): Promise<void>{
    try{
      const patient_valid = await new PatientEntity(patient_dto.id, patient_dto.name);
      await this._patientRepository.addPatient(patient_valid)
    } catch(err){
      console.log(err);
      throw new Error("Failed to find patient");
    }
  }
}
