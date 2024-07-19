import { IConnectionManagerRepository } from "../../domain/repository/connection-manager.js";
import { HospitalId } from "../../domain/value-object/id.vo.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";

export interface IRemoveConnectionUseCase {
  execute(id: HospitalId): void;
}
@injectable()
export class RemoveConnectionUseCaseImpl implements IRemoveConnectionUseCase {
  private _connectionManagerRepository: IConnectionManagerRepository;

  constructor(@inject(TYPES.IConnectionManagerRepository) connectionManagerRepository: IConnectionManagerRepository) {
    this._connectionManagerRepository = connectionManagerRepository;
  }
  execute(id: HospitalId) {
    this._connectionManagerRepository.removeConnection(id);
  }
}