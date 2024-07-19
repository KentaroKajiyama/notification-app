import { Request, Response } from "express";
import { ISearchPatientUseCase } from "../../app/patient/search.js";
import { validationResult } from "express-validator";
import axios from "axios";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";
import "reflect-metadata";

@injectable()
export class CheckinHandler {
  private _searchPatientUseCase: ISearchPatientUseCase;
  constructor(@inject(TYPES.ISearchPatientUseCase) searchPatientUseCase: ISearchPatientUseCase) {
    this._searchPatientUseCase = searchPatientUseCase;
  }
  async execute(req: Request, res: Response):Promise<void>{
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { patient_id, hospital_id } = req.body;
      const patient = await this._searchPatientUseCase.execute(patient_id);
      await axios.post("http://localhost:3000/api/v1/hospital/sse",{patient: JSON.stringify(patient), hospital_id: hospital_id});
      res.status(200).json({ message: "Check-in successful" });
    } catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}