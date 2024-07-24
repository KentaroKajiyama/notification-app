import { PatientId } from "../value-object/id.vo.ts";
import { createPatientId } from "../value-object/id.vo.ts";

export class PatientEntity{
  private readonly _id: PatientId;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = createPatientId(id);
    this._name = name;
  }

  get getId(): PatientId {
    return this._id;
  }

  get getName(): string {
    return this._name;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name
    }
  }
}