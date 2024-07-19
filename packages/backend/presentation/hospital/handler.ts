import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IAddConnectionUseCase } from "../../app/hospital/add-connection.js";
import { IRemoveConnectionUseCase } from "../../app/hospital/remove-connection.js";
import { ISearchHospitalUseCase } from "../../app/hospital/search.js";
import { IServerSentEventsUseCase } from "../../app/hospital/sse.js";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types.js";

@injectable()
export class ConnectionHandler {
  private _addConnectionUseCase: IAddConnectionUseCase;
  private _removeConnectionUseCase: IRemoveConnectionUseCase;

  constructor(@inject(TYPES.IAddConnectionUseCase) addConnectionUseCase: IAddConnectionUseCase, @inject(TYPES.IRemoveConnectionUseCase) removeConnectionUseCase: IRemoveConnectionUseCase) {
    this._addConnectionUseCase = addConnectionUseCase;
    this._removeConnectionUseCase = removeConnectionUseCase;
  }

  async execute(req: Request, res: Response): Promise<void> {
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

export class ServerSentEventsHandler {
  private _searchHospitalUseCase: ISearchHospitalUseCase;
  private _serverSentEventsUseCase: IServerSentEventsUseCase;

  constructor(@inject(TYPES.ISearchHospitalUseCase) searchHospitalUseCase: ISearchHospitalUseCase, @inject(TYPES.IServerSentEventsUseCase) serverSentEventsUseCase: IServerSentEventsUseCase) {
    this._searchHospitalUseCase = searchHospitalUseCase;
    this._serverSentEventsUseCase = serverSentEventsUseCase;
  }

  async execute(req: Request, res: Response): Promise<void>{
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { patient, hospital_id } = req.body;
      const hospital = await this._searchHospitalUseCase.execute(hospital_id);
      this._serverSentEventsUseCase.execute(patient, hospital);
    }catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}