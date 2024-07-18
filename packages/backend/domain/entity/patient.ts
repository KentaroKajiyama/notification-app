import { PatientId } from "../value-object.ts/id.vo.js";

export class PatientEntity{
  private readonly _id: PatientId;
  private _name: string;

  constructor(id: PatientId, name: string) {
    this._id = id;
    this._name = name;
  }

  get getId(): PatientId {
    return this._id;
  }

  get getName(): string {
    return this._name;
  }
}