import { IConnectionManagerRepository } from "../../domain/repository/connection-manager.js";
import { HospitalId } from "../../domain/value-object/id.vo.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";

export interface IRemoveConnectionUseCase {
  execute(id: HospitalId): Promise<void>;
}
@injectable()
export class RemoveConnectionUseCaseImpl implements IRemoveConnectionUseCase {
  private _connectionManagerRepository: IConnectionManagerRepository;
  constructor(@inject(TYPES.IConnectionManagerRepository) connectionManagerRepository: IConnectionManagerRepository) {
    this._connectionManagerRepository = connectionManagerRepository;
  }
  async execute(id: HospitalId): Promise<void> {
    try{
      this._connectionManagerRepository.removeConnection(id);
    } catch(error){
      console.log(error);
      throw new Error("There is an error for removing connection.")
    }
  }
}