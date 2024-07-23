import { PatientId } from "../../domain/value-object/id.vo.ts";
import { IPatientRepository } from "../../domain/repository/patient-repository.ts";
import { PatientEntity } from "../../domain/entity/patient.ts";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../di/types.ts";

export interface ISearchPatientUseCase{
  execute(id: PatientId): Promise<PatientEntity>
}
@injectable()
export class SearchPatientUseCaseImpl implements ISearchPatientUseCase{
  private _patientRepository: IPatientRepository
  constructor(@inject(TYPES.IPatientRepository) patientRepository: IPatientRepository){
    this._patientRepository = patientRepository
  }
  execute = async (id: PatientId): Promise<PatientEntity> => {
    try{
      const patient = await this._patientRepository.findById(id);
      return patient;
    } catch(err){
      console.log(err);
      throw new Error("Failed to find patient");
    }
  }
}
