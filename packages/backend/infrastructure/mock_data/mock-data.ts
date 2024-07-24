import { Request, Response } from "express";

export class ConnectionMockDB{
  static data: Map<string,[Request,Response]> = new Map();
  static async addData(key:string, value:[Request,Response]):Promise<void> {
    try{
      if(!this.data.has(key)){
        this.data.set(key, value);
      } else {
        throw new Error(`Data already exists for key: ${key}`);
      }
    } catch(error){
      throw new Error(`Error adding data to DB: ${error}`);
    }
  }
  static async removeData(key:string):Promise<void>{
    try{
      if(this.data.has(key)){
        this.data.delete(key);
      } else {
        throw new Error(`Data does not exist for key: ${key}`);
      }
    } catch(error){
      throw new Error(`Error removing data from DB: ${error}`);
    }
  }
  static async getData(key:string):Promise<[Request,Response]>{
    try{
      if(!this.data.has(key)){
        throw new Error(`Data does not exist for key: ${key}`);
      }
      const data = this.data.get(key);
      if(data === undefined){
        throw new Error("Data is undefined")
      }
      return data;
    } catch(error){
      throw new Error(`Error getting data from DB: ${error}`);
    }
  }
}

type PatientData ={
  id: string,
  name: string
}
export class PatientMockDB{
  static data: PatientData[] = [];
  static async addData(patient: PatientData):Promise<void>{
    try{
      if(!this.data.some(p => p.id===patient.id)){
        this.data.push(patient);
      } else {
        throw new Error(`Data already exists for patient id: ${patient.id}`);
      }
    } catch(error){
      throw new Error(`Error adding data to DB: ${error}`);
    }
  }
  static async removeData(id: string):Promise<void>{
    try{
      if(this.data.some(p => p.id===id)){
        this.data = this.data.filter(p => p.id!==id);
      } else {
        throw new Error(`Data does not exist for patient id: ${id}`);
      }
    } catch(error){ 
      throw new Error(`Error removing data from DB: ${error}`);
    }
  }
  static async getData(id: string):Promise<PatientData>{
    try{
      if(!this.data.some(p => p.id===id)){throw new Error(`Data does not exist for patient id: ${id}`);}
      const data = this.data.find(p=> p.id === id);
      if(data === undefined){
        throw new Error("Data is undefined")
      }
      return data;
    } catch(error){
      throw new Error(`Error getting data from DB: ${error}`);
    }
  }
}

type HospitalData ={
  id: string,
  name: string,
  ip_address: string,
  port: number
}
export class HospitalMockDB{
  static data: HospitalData[] = [];
  static async addData(hospital: HospitalData):Promise<void>{
    try{
      if(!this.data.some(h => h.id===hospital.id)){
        this.data.push(hospital);
      } else {
        throw new Error(`Data already exists for hospital id: ${hospital.id}`);
      }
    } catch(error){
      throw new Error(`Error adding data to DB: ${error}`);
    }
  }
  static async removeData(id: string):Promise<void>{
    try{
      if(this.data.some(h => h.id===id)){
        this.data = this.data.filter(h => h.id!==id);
      } else {
        throw new Error(`Data does not exist for hospital id: ${id}`);
      }
    } catch(error){ 
      throw new Error(`Error removing data from DB: ${error}`);
    }
  }
  static async getData(id: string):Promise<HospitalData>{
    try{
      if(!this.data.some(h => h.id===id)){throw new Error(`Data does not exist for hospital id: ${id}`);}
      const data = this.data.find(h => h.id===id);
      if(data === undefined){
        throw new Error(`Data does not exist for hospital id : ${id}`)
      }
      return data;
    } catch(error){
      console.log(error);
      throw new Error(`Error getting data from DB: ${error}`)
    }
  }
}