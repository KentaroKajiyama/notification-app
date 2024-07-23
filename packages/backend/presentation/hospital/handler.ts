import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IAddConnectionUseCase } from "../../app/hospital/add-connection.js";
import { IRemoveConnectionUseCase } from "../../app/hospital/remove-connection.js";
import { ISearchHospitalUseCase } from "../../app/hospital/search.js";
import { IServerSentEventsUseCase } from "../../app/hospital/sse.js";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";
import { createPatientId } from "../../domain/value-object/id.vo.js";
import { PatientEntity } from "../../domain/entity/patient.ts";
import { IAddHospitalUseCase } from "../../app/hospital/add-hospital.ts";
import { IRemoveHospitalUseCase } from "../../app/hospital/remove-hospital.ts";


@injectable()
export class ConnectionHandler {
  private _addConnectionUseCase: IAddConnectionUseCase;
  private _removeConnectionUseCase: IRemoveConnectionUseCase;

  constructor(@inject(TYPES.IAddConnectionUseCase) addConnectionUseCase: IAddConnectionUseCase, @inject(TYPES.IRemoveConnectionUseCase) removeConnectionUseCase: IRemoveConnectionUseCase) {
    this._addConnectionUseCase = addConnectionUseCase;
    this._removeConnectionUseCase = removeConnectionUseCase;
  }

  execute = async(req: Request, res: Response): Promise<void> => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      //requestの形はどのように規定する？validationルールはどのように設ける？上の記述にも関連する
      const { id } = req.body;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Cache-Control', 'no-cache');
      res.write("\n")
      req.on("close", async () => {
        try{
          this._removeConnectionUseCase.execute(id);
        } catch(error){
          return res.status(500).json({message: "Internal Server Error."})
        }
      });
      await this._addConnectionUseCase.execute(id, req, res);
      res.status(200).json({message: "Succeeded in connection."})
    } catch(error){
      res.status(500).json({message: "Internal Server Error."})
    }
  }
}
@injectable()
export class ServerSentEventsHandler {
  private _searchHospitalUseCase: ISearchHospitalUseCase;
  private _serverSentEventsUseCase: IServerSentEventsUseCase;

  constructor(@inject(TYPES.ISearchHospitalUseCase) searchHospitalUseCase: ISearchHospitalUseCase, @inject(TYPES.IServerSentEventsUseCase) serverSentEventsUseCase: IServerSentEventsUseCase) {
    this._searchHospitalUseCase = searchHospitalUseCase;
    this._serverSentEventsUseCase = serverSentEventsUseCase;
  }

  execute = async(req: Request, res: Response): Promise<void> => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { patient, hospital_id } = req.body;
      const hospital_valid = await this._searchHospitalUseCase.execute(hospital_id);
      const patient_id = createPatientId(patient.id);
      const patient_valid = new PatientEntity(patient_id, patient.name);
      await this._serverSentEventsUseCase.execute(patient_valid, hospital_valid);
      res.status(200).json({ message: "Success for SSE."});
    } catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
@injectable()
export class AddHospitalHandler{
  private _addHospitalUseCase: IAddHospitalUseCase;
  constructor(@inject(TYPES.IAddHospitalUseCase) addHospitalUseCase: IAddHospitalUseCase){
    this._addHospitalUseCase  = addHospitalUseCase;
  }
  execute = async(req : Request, res: Response):Promise<void> => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { id, name, ip_address, port } = req.body;
      const hospitalDto = { id, name, ip_address, port };
      await this._addHospitalUseCase.execute(hospitalDto);
      res.status(201).json({ message: "Patient added successfully" });
    } catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

@injectable()
export class RemoveHospitalHandler{
  private _removeHospitalUseCase: IRemoveHospitalUseCase;
  constructor(@inject(TYPES.IRemoveHospitalUseCase) removeHospitalUseCase: IRemoveHospitalUseCase){
    this._removeHospitalUseCase  = removeHospitalUseCase;
  }
  execute = async(req : Request, res: Response):Promise<void> => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.body;
      await this._removeHospitalUseCase.execute(id);
      res.status(201).json({ message: "Patient removed successfully" });
    } catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}