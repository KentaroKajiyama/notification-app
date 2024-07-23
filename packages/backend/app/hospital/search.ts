import { IHospitalRepository } from "../../domain/repository/hospital-repository.ts";
import { inject, injectable } from "inversify";
import { HospitalEntity } from "../../domain/entity/hospital.ts";
import { TYPES } from "../../di/types.ts";
import { createHospitalId } from "../../domain/value-object/id.vo.ts";


export interface ISearchHospitalUseCase {
  execute(id: string): Promise<HospitalEntity>;
}
@injectable()
export class SearchHospitalUseCaseImpl implements ISearchHospitalUseCase {
  private _hospitalRepository: IHospitalRepository;
  constructor(@inject(TYPES.IHospitalRepository) hospitalRepository: IHospitalRepository) {
    this._hospitalRepository = hospitalRepository;
  }
  async execute(id: string): Promise<HospitalEntity> {
    try{
      const hospital_id = createHospitalId(id);
      return this._hospitalRepository.findById(hospital_id);
    } catch(error){
      console.log(error);
      throw new Error("There is an error for fetching hospital information.")
    }
  }
}