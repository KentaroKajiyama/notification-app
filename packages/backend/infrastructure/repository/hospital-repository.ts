import "reflect-metadata";
import { injectable } from "inversify";
import { IHospitalRepository } from "../../domain/repository/hospital-repository.js";
import { HospitalMockDB } from "../mock_data/mock-data.js";
import { createHospitalId } from "../../domain/value-object/id.vo.js";
import { parseIpAddress } from "../../domain/value-object/ip-address.vo.js";
import { parsePort } from "../../domain/value-object/port.vo.js";
import { HospitalEntity } from "../../domain/entity/hospital.js";

@injectable()
export class HospitalRepositoryImpl implements IHospitalRepository {
  async findById(id: string): Promise<HospitalEntity> {
    try{
      const hospital = await HospitalMockDB.getData(id);
      const hospital_id = createHospitalId(hospital.id);
      const hospital_ip_address = parseIpAddress(hospital.ip_address);
      const hospital_port = parsePort(hospital.port);
      const hospital_valid = new HospitalEntity(hospital_id, hospital.name, hospital_ip_address, hospital_port)
      return hospital_valid;
    } catch(error){
      console.log(error);
      throw new Error("There is an error for getting hospital data.")
    }
  }
}