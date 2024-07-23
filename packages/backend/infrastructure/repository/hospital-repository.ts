import "reflect-metadata";
import { injectable } from "inversify";
import { IHospitalRepository } from "../../domain/repository/hospital-repository.ts";
import { HospitalMockDB } from "../mock_data/mock-data.ts";
import { HospitalId } from "../../domain/value-object/id.vo.ts";
import { HospitalEntity } from "../../domain/entity/hospital.ts";

@injectable()
export class HospitalRepositoryImpl implements IHospitalRepository {
  async findById(id: HospitalId): Promise<HospitalEntity> {
    try{
      const hospital = await HospitalMockDB.getData(id);
      const hospital_valid = new HospitalEntity(hospital.id, hospital.name, hospital.ip_address, hospital.port.toString())
      return hospital_valid;
    } catch(error){
      console.log(error);
      throw new Error("There is an error for getting hospital data.")
    }
  }
  async addHospital(hospital: HospitalEntity): Promise<void>{
    try{
      const hospital_data = {
        id : hospital.getId,
        name : hospital.getName,
        ip_address : hospital.getIpAddress,
        port : hospital.getPort
      }
      await HospitalMockDB.addData(hospital_data);
    } catch(error) {
      console.log(error);
      throw new Error("There is an error for adding hospital data.")
    }
  }
  async removeHospital(id: HospitalId): Promise<void>{
    try{
      await HospitalMockDB.removeData(id);
    } catch(error) {
      console.log(error);
      throw new Error("There is an error for removing hospital data.")
    }
  }
}