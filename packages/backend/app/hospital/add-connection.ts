import { IConnectionManagerRepository } from "../../domain/repository/connection-manager.ts";
import { createHospitalId } from "../../domain/value-object/id.vo.ts";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.ts";

export interface IAddConnectionUseCase {
  execute(id: string, request: Request, response: Response): Promise<void>;
}

@injectable()
export class AddConnectionUseCaseImpl implements IAddConnectionUseCase  {
  private _connectionManagerRepository: IConnectionManagerRepository;
  constructor(@inject(TYPES.IConnectionManagerRepository) connectionManagerRepository: IConnectionManagerRepository) {
    this._connectionManagerRepository = connectionManagerRepository;
  }
  execute = async(id: string, request: Request, response: Response) : Promise<void> => {
    try{
      const hospital_id = createHospitalId(id);
      this._connectionManagerRepository.addConnection(hospital_id, request, response);
    } catch(error){
      console.log(error);
      throw new Error("There is an error for adding connection.")
    }
  }
}
