import { injectable } from "inversify";
import { IConnectionManagerRepository } from "../../domain/repository/connection-manager.js";
import { HospitalId } from "../../domain/value-object/id.vo.js";
import { Request, Response } from "express";
import { ConnectionMockDB } from "../mock_data/mock-data.js";

@injectable()
export class ConnectionManagerRepositoryImpl implements IConnectionManagerRepository {
  async addConnection(id: HospitalId, request: Request, response: Response): Promise<void> {
    try{
      ConnectionMockDB.addData(id, [request, response]);
    } catch(error){
      console.log(error);
      throw new Error("There is a data handling error for adding connection.")
    }
  }
  async removeConnection(id: HospitalId): Promise<void> {
    try{
      ConnectionMockDB.removeData(id);
    } catch(error){
      console.log(error);
      throw new Error("There is a data handling error for removing connection.")
    }
  }
  async getConnection(id: HospitalId): Promise<[Request, Response]> {
    try{  
      const connection:[Request, Response] = await ConnectionMockDB.getData(id);
      return connection;
    } catch(error){
      console.log(error);
      throw new Error("There is a data handling error for getting connection.")
    }
  }
}