import { IConnectionManagerRepository } from "../../domain/repository/connection-manager.ts";
import { PatientEntity } from "../../domain/entity/patient.ts";
import { HospitalEntity } from "../../domain/entity/hospital.ts";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.ts";

export interface IServerSentEventsUseCase{
  execute(patient: PatientEntity, hospital: HospitalEntity):Promise<void>;
}
@injectable()
export class ServerSentEventsUseCaseImpl implements IServerSentEventsUseCase {
  private _connectionManagerRepository: IConnectionManagerRepository;

  constructor(@inject(TYPES.IConnectionManagerRepository) connectionManagerRepository: IConnectionManagerRepository) {
    this._connectionManagerRepository = connectionManagerRepository;
  }

  execute = async(patient: PatientEntity, hospital: HospitalEntity): Promise<void> => {
    try{
      const hospital_id = hospital.getId
      const [request, response] = await this._connectionManagerRepository.getConnection(hospital_id);
      if (!request ||!response) {
        throw new Error("Connection not found");
      }
      // TODO:ipアドレスの確認等もう少し確実性を高めたい
      // TODO:response.writeのエラーハンドリング
      response.write(`data: ${JSON.stringify(patient)}\n\n`)
    } catch(error) {
      console.log(error);
      throw new Error("There is an error in SSE.")
    }
  }
}