import { PatientId } from "../../domain/value-object/id.vo.js";
import { IPatientRepository } from "../../domain/repository/patient-repository.js";
import { PatientEntity } from "../../domain/entity/patient.js";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../di/types.js";

export interface ISearchPatientUseCase{
  execute(id: PatientId): Promise<PatientEntity>
}
@injectable()
export class SearchPatientUseCaseImpl implements ISearchPatientUseCase{
  private _patientRepository: IPatientRepository
  constructor(@inject(TYPES.IPatientRepository) patientRepository: IPatientRepository){
    this._patientRepository = patientRepository
  }
  async execute(id: PatientId): Promise<PatientEntity>{
    try{
      const patient = await this._patientRepository.findById(id);
      return patient;
    } catch(err){
      console.log(err);
      throw new Error("Failed to find patient");
    }
  }
}
