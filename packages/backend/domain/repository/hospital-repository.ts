import { HospitalEntity } from "../entity/hospital.js";
import { HospitalId } from "../value-object/id.vo.js";

export interface HospitalRepository {
  findById(id: HospitalId): Promise<HospitalEntity>;
}