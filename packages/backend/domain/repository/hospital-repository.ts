import { HospitalEntity } from "../entity/hospital.js";
import { HospitalId } from "../value-object/id.vo.js";

export interface IHospitalRepository {
  findById(id: string): Promise<HospitalEntity>;
}