import { IPatientRepository } from "../../domain/repository/patient-repository.ts";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../di/types.ts";
import { createPatientId } from "../../domain/value-object/id.vo.ts";

export interface IRemovePatientUseCase{
  execute(id: string): Promise<void>
}
@injectable()
export class RemovePatientUseCaseImpl implements IRemovePatientUseCase{
  private _patientRepository: IPatientRepository
  constructor(@inject(TYPES.IPatientRepository) patientRepository: IPatientRepository){
    this._patientRepository = patientRepository
  }
  execute = async(id: string): Promise<void> => {
    try{
      const id_valid = createPatientId(id);
      await this._patientRepository.removePatient(id_valid)
    } catch(error){
      console.log(error);
      throw new Error("Failed to find patient");
    }
  }
}
