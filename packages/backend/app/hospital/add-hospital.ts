import { HospitalEntity } from "../../domain/entity/hospital.ts";
import { TYPES } from "../../di/types.ts";
import { inject, injectable } from "inversify";
import { IHospitalRepository } from "../../domain/repository/hospital-repository.ts";

type hospitalDto =  {
  id: string,
  name: string,
  ip_address: string,
  port: string,
}

export interface IAddHospitalUseCase {
  execute(hospital: hospitalDto): Promise<void>;
}

@injectable()
export class AddHospitalUseCaseImpl implements IAddHospitalUseCase {
  private _hospitalRepository: IHospitalRepository;
  constructor(@inject(TYPES.IHospitalRepository) hospitalRepository: IHospitalRepository) {
    this._hospitalRepository = hospitalRepository;
  };

  execute = async(hospital: hospitalDto): Promise<void> =>{
    try{
      await this._hospitalRepository.addHospital(new HospitalEntity(hospital.id, hospital.name, hospital.ip_address, hospital.port))
    } catch(error) {
      console.log(error);
      throw new Error("Failed to add hospital data.")
    }
  }
}