import { HospitalEntity } from "../entity/hospital.ts";
import { HospitalId } from "../value-object/id.vo.ts";

export interface IHospitalRepository {
  findById(id: HospitalId): Promise<HospitalEntity>;
  addHospital(hospital: HospitalEntity): Promise<void>;
  removeHospital(id: HospitalId): Promise<void>;
}