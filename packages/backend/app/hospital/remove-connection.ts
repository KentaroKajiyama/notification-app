import { IConnectionManagerRepository } from "../../domain/repository/connection-manager.js";
import { createHospitalId } from "../../domain/value-object/id.vo.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";

export interface IRemoveConnectionUseCase {
  execute(id: string): Promise<void>;
}
@injectable()
export class RemoveConnectionUseCaseImpl implements IRemoveConnectionUseCase {
  private _connectionManagerRepository: IConnectionManagerRepository;
  constructor(@inject(TYPES.IConnectionManagerRepository) connectionManagerRepository: IConnectionManagerRepository) {
    this._connectionManagerRepository = connectionManagerRepository;
  }
  async execute(id: string): Promise<void> {
    try{
      const hospital_id = createHospitalId(id)
      this._connectionManagerRepository.removeConnection(hospital_id);
    } catch(error){
      console.log(error);
      throw new Error("There is an error for removing connection.")
    }
  }
}