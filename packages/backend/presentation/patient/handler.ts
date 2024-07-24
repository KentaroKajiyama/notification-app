import { Request, Response } from "express";
import { ISearchPatientUseCase } from "../../app/patient/search.js";
import { validationResult } from "express-validator";
import axios from "axios";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";
import "reflect-metadata";
import { IAddPatientUseCase } from "../../app/patient/add.js";
import { IRemovePatientUseCase } from "../../app/patient/remove.js";

@injectable()
export class CheckinHandler {
  private _searchPatientUseCase: ISearchPatientUseCase;
  constructor(@inject(TYPES.ISearchPatientUseCase) searchPatientUseCase: ISearchPatientUseCase) {
    this._searchPatientUseCase = searchPatientUseCase;
  }
  execute = async (req: Request, res: Response):Promise<void> => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { patient_id, hospital_id } = req.body;
      const patient = await this._searchPatientUseCase.execute(patient_id);
      await axios.post("http://localhost:3000/api/v1/hospital/sse",{patient: JSON.stringify(patient), hospital_id: hospital_id});
      res.status(200).json({ message: "Check-in success" });
    } catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
@injectable()
export class AddPatientHandler {
  private _addPatientUseCase: IAddPatientUseCase;
  constructor(@inject(TYPES.IAddPatientUseCase) addPatientUseCase: IAddPatientUseCase) {
    this._addPatientUseCase = addPatientUseCase;
  }
  execute = async(req: Request, res: Response): Promise<void> => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { id, name } = req.body;
      const patientDto = { id, name };
      await this._addPatientUseCase.execute(patientDto);
      res.status(201).json({ message: "Patient added successfully" });
    } catch(error){
      console.log(error);
      res.status(500).json({ message: `Internal Server Error:${error}` });
    }
  }
}

@injectable()
export class RemovePatientHandler {
  private _removePatientUseCase: IRemovePatientUseCase;
  constructor(@inject(TYPES.IRemovePatientUseCase) removePatientUseCase: IRemovePatientUseCase) {
    this._removePatientUseCase = removePatientUseCase;
  }
  execute = async(req: Request, res: Response): Promise<void> => {
    try{
      const { id } = req.params;
      await this._removePatientUseCase.execute(id);
      res.status(204).json({ message: "Patient removed successfully" });
    } catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
