import { IHospitalRepository } from "../../domain/repository/hospital-repository.ts";
import { TYPES } from "../../di/types.ts";  
import { inject, injectable } from "inversify";
import { createHospitalId } from "../../domain/value-object/id.vo.ts";

export interface IRemoveHospitalUseCase{
  execute(id: string): Promise<void>
}
@injectable()
export class RemoveHospitalUseCaseImpl implements IRemoveHospitalUseCase{
  private _hospitalRepository: IHospitalRepository
  constructor(@inject(TYPES.IHospitalRepository) hospitalRepository: IHospitalRepository){
    this._hospitalRepository = hospitalRepository
  }
  async execute(id: string): Promise<void>{
    try{
      const id_valid = createHospitalId(id);
      await this._hospitalRepository.removeHospital(id_valid)
    } catch(err){
      console.log(err);
      throw new Error("Failed to find hospital");
    }
  }
}
